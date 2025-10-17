export default function LoginPage() {
  return (
    <div style={{ margin: "4rem auto", maxWidth: 400, textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Login Required</h1>
      <p>Please log in to access hotel management features.</p>
      {/* If using NextAuth, add: */}
      <a href="/api/auth/signin">
        <button style={{ marginTop: "2rem", padding: "0.75rem 2rem", fontSize: "1rem" }}>
          Sign In
        </button>
      </a>
    </div>
  );
}
