export function BackgroundElements() {
  return (
    <>
      {/* Background elements */}
      <div className="fixed -top-[30vh] -left-[30vw] w-[80vw] h-[80vh] bg-[#C00000] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="fixed -bottom-[30vh] -right-[30vw] w-[80vw] h-[80vh] bg-[#4A90E2] rounded-full opacity-[0.03] blur-[120px] pointer-events-none"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[url('/placeholder.svg?height=800&width=800')] bg-repeat opacity-[0.02] pointer-events-none"></div>
    </>
  );
}
