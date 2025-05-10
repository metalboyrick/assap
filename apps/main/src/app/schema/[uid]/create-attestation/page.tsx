"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  AlertCircle,
  Check,
  Twitter,
  Mail,
  Wallet,
  Info,
  Shield,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock schema data
const schemaDetail = {
  uid: "sch_01234567890123456789",
  name: "Identity Verification",
  cost: "0.01 SOL",
  humanMessage:
    "{fullName} declares that they have completed KYC verification approved by {approver}",
  fields: [
    { name: "fullName", type: "string", required: true },
    { name: "dateOfBirth", type: "string", required: true },
    { name: "nationality", type: "string", required: true },
    { name: "idType", type: "string", required: true },
    { name: "idNumber", type: "string", required: true },
    { name: "approver", type: "string", required: true },
    { name: "verificationLevel", type: "integer", required: false },
  ],
  verifications: ["Email", "Human", "Solana Balance"],
};

// Mock verification status data
const verificationStatus = [
  {
    id: "solana",
    name: "Solana Wallet",
    isVerified: true,
    icon: Wallet,
    iconBgClass: "bg-purple-900/30",
    iconColorClass: "text-purple-400",
  },
  {
    id: "faceId",
    name: "Face ID",
    isVerified: false,
    icon: Fingerprint,
    iconBgClass: "bg-green-900/30",
    iconColorClass: "text-green-400",
  },
  {
    id: "twitter",
    name: "Twitter",
    isVerified: true,
    icon: Twitter,
    iconBgClass: "bg-blue-900/30",
    iconColorClass: "text-blue-400",
  },
  {
    id: "email",
    name: "Email",
    isVerified: false,
    icon: Mail,
    iconBgClass: "bg-red-900/30",
    iconColorClass: "text-red-400",
  },
];

export default function CreateAttestationFromSchemaPage({
  params,
}: {
  params: { uid: string };
}) {
  // In a real app, you would fetch the schema data using the UID
  const schema = schemaDetail;

  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [showHumanMessage, setShowHumanMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifyModalOpen(true);
  };

  const handleVerifyConfirm = () => {
    setIsVerifyModalOpen(false);
    setIsStatusModalOpen(true);
  };

  const handleStatusConfirm = () => {
    setIsStatusModalOpen(false);
    setShowHumanMessage(true);
  };

  const handleCreateAttestation = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const allRequiredFieldsFilled = schema.fields
    .filter((field) => field.required)
    .every(
      (field) => formValues[field.name] && formValues[field.name].trim() !== "",
    );

  const renderHumanMessage = () => {
    let message = schema.humanMessage;
    Object.entries(formValues).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, value);
    });
    return message;
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto mt-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-2xl">
              Attestation Created Successfully
            </CardTitle>
            <CardDescription>
              Your attestation has been recorded on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-900/20 border-green-800 text-green-100">
              <Check className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your attestation has been created and is now being processed on
                the Solana blockchain.
              </AlertDescription>
            </Alert>
            <div className="p-4 bg-zinc-800 rounded-md">
              <h3 className="font-medium mb-2">Human Message</h3>
              <p className="text-lg">{renderHumanMessage()}</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/schema/${params.uid}`}>
              <Button variant="outline" className="border-zinc-700">
                Back to Schema
              </Button>
            </Link>
            <Link href="/">
              <Button className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700">
                View All Attestations
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <Link
          href={`/schema/${params.uid}`}
          className="inline-flex items-center text-zinc-400 hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Schema
        </Link>
        <h1 className="text-3xl font-bold tracking-tighter">
          Create Attestation
        </h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
          <p className="text-zinc-400">Using schema: {schema.name}</p>
          <Badge className="bg-green-900/20 text-green-400 border-green-800 md:ml-2">
            Cost: {schema.cost}
          </Badge>
        </div>
      </div>

      {/* First Verification Modal */}
      <Dialog open={isVerifyModalOpen} onOpenChange={setIsVerifyModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Please Verify Your Identity
            </DialogTitle>
            <DialogDescription>
              Choose a verification method to proceed with creating your
              attestation
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center mr-4">
                  <Twitter className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Twitter</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your Twitter account
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center mr-4">
                  <Wallet className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-medium">Solana Wallet</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your Solana wallet
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 border border-zinc-800 rounded-lg hover:bg-zinc-800/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center mr-4">
                  <Mail className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-zinc-400">
                    Verify using your email address
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center mt-2">
              <Info className="h-4 w-4 text-zinc-500 mr-2" />
              <span className="text-xs text-zinc-500">
                Select a verification method to continue
              </span>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="border-zinc-700 sm:w-auto w-full"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={handleVerifyConfirm}
            >
              Check Verification Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Verification Status Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Your Verification Status
            </DialogTitle>
            <DialogDescription>
              Review your current verification status for different identity
              methods
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              {verificationStatus.map((method) => (
                <div
                  key={method.id}
                  className="flex items-center justify-between p-4 border border-zinc-800 rounded-lg"
                >
                  <div className="flex items-center">
                    <div
                      className={`h-10 w-10 rounded-full ${method.iconBgClass} flex items-center justify-center mr-4`}
                    >
                      <method.icon
                        className={`h-5 w-5 ${method.iconColorClass}`}
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{method.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {method.isVerified ? "Verified" : "Not verified"}
                      </p>
                    </div>
                  </div>
                  <div>
                    {method.isVerified ? (
                      <div className="flex items-center text-green-400">
                        <CheckCircle2 className="h-5 w-5 mr-1" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-zinc-700 hover:bg-zinc-800"
                            >
                              Verify
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Not active in mockup</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <Alert className="bg-zinc-800 border-zinc-700">
              <Shield className="h-4 w-4 text-blue-400" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                This schema requires at least one verified identity method to
                create an attestation.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="border-zinc-700 sm:w-auto w-full"
              onClick={() => {
                setIsStatusModalOpen(false);
                setIsVerifyModalOpen(true);
              }}
            >
              Back
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 sm:w-auto w-full"
              onClick={handleStatusConfirm}
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {!showHumanMessage ? (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Fill Attestation Details</CardTitle>
            <CardDescription>
              Complete all required fields to create an attestation using this
              schema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {schema.fields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label
                      htmlFor={field.name}
                      className="flex items-center gap-1"
                    >
                      {field.name}
                      {field.required && (
                        <span className="text-red-500">*</span>
                      )}
                      <Badge
                        variant="outline"
                        className={cn(
                          "ml-2 text-xs",
                          field.type.includes("string")
                            ? "bg-blue-900/20 border-blue-800 text-blue-400"
                            : "",
                          field.type.includes("integer")
                            ? "bg-purple-900/20 border-purple-800 text-purple-400"
                            : "",
                          field.type.includes("boolean")
                            ? "bg-green-900/20 border-green-800 text-green-400"
                            : "",
                        )}
                      >
                        {field.type}
                      </Badge>
                    </Label>
                    {field.type === "string" && (
                      <Input
                        id={field.name}
                        value={formValues[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={`Enter ${field.name}`}
                        className="bg-zinc-900 border-zinc-800"
                        required={field.required}
                      />
                    )}
                    {field.type === "integer" && (
                      <Input
                        id={field.name}
                        type="number"
                        value={formValues[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={`Enter ${field.name}`}
                        className="bg-zinc-900 border-zinc-800"
                        required={field.required}
                      />
                    )}
                    {field.type === "boolean" && (
                      <Select
                        value={formValues[field.name] || ""}
                        onValueChange={(value) =>
                          handleInputChange(field.name, value)
                        }
                      >
                        <SelectTrigger
                          id={field.name}
                          className="bg-zinc-900 border-zinc-800"
                        >
                          <SelectValue placeholder={`Select ${field.name}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-900 border-zinc-800">
                          <SelectItem value="true" className="text-white">
                            True
                          </SelectItem>
                          <SelectItem value="false" className="text-white">
                            False
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                ))}
              </div>

              <Alert className="bg-zinc-800 border-zinc-700">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Important</AlertTitle>
                <AlertDescription>
                  By creating this attestation, you are confirming that all
                  provided information is accurate and can be verified on the
                  Solana blockchain.
                </AlertDescription>
              </Alert>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
                  disabled={!allRequiredFieldsFilled}
                >
                  Create Attestation
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>Confirm Attestation</CardTitle>
            <CardDescription>
              Review the human-readable message before creating the attestation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-zinc-800 rounded-md border border-zinc-700">
              <h2 className="text-xl font-medium mb-4">Human Message</h2>
              <p className="text-xl">{renderHumanMessage()}</p>
            </div>

            <Alert className="bg-zinc-800 border-zinc-700">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Verification Required</AlertTitle>
              <AlertDescription>
                This attestation requires the following verifications:{" "}
                {schema.verifications.join(", ")}
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => setShowHumanMessage(false)}
              variant="outline"
              className="border-zinc-700"
            >
              Edit Fields
            </Button>
            <Button
              className="bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
              onClick={handleCreateAttestation}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Attestation"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );

  function cn(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
}
