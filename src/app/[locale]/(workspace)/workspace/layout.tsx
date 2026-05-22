export default function WorkspaceLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="workspace-wrapper site-dot-grid">
        {children}
      </div>
    );
  }
