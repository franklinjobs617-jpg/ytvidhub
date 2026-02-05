export default function WorkspaceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="workspace-wrapper">
        {children}
      </div>
    );
  }