'use client'

import { getContractsProgram, getContractsProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useContractsProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getContractsProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getContractsProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['contracts', 'all', { cluster }],
    queryFn: () => program.account.contracts.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['contracts', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ contracts: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useContractsProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useContractsProgram()

  const accountQuery = useQuery({
    queryKey: ['contracts', 'fetch', { cluster, account }],
    queryFn: () => program.account.contracts.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['contracts', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ contracts: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['contracts', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ contracts: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['contracts', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ contracts: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['contracts', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ contracts: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
