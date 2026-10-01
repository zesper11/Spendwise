import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { defaultAvatar } from "../../utils/api";
import "./auth.css";

const Auth = () => {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const isSignup = mode === "signup";

  const chooseAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 1_800_000) {
      setError("Choose an image under 1.8 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result));
    reader.readAsDataURL(file);
    setError("");
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (isSignup) await signup({ name, email, password, avatar });
      else await login({ email, password });
      navigate("/transactions", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="auth-page">
      <a className="auth-top-brand" href="/auth">
        <span className="brand-mark">S</span> spendwise
      </a>
      <section className="auth-story" aria-label="Spendwise overview">
        <a className="auth-brand" href="/auth">
          <span className="brand-mark">S</span> spendwise
        </a>
        <div className="story-copy">
          <p className="story-kicker">A clearer view of your money</p>
          <h1>
            Make room for
            <br />
            what matters.
          </h1>
          <p className="story-description">
            Bring your income and spending into one calm, personal picture.
          </p>
        </div>
        <div className="story-ledger" aria-hidden="true">
          <div className="ledger-top">
            <span>Monthly overview</span>
            <span>THIS YEAR</span>
          </div>
          <div className="ledger-total">
            $4,280.50 <span>+12.8%</span>
          </div>
          <div className="ledger-bars">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="ledger-months">
            <span>JAN</span>
            <span>APR</span>
            <span>JUL</span>
            <span>OCT</span>
          </div>
        </div>
        <span className="story-footnote">YOUR MONEY, IN GOOD ORDER</span>
      </section>

      <section className="auth-panel">
        <div className="auth-panel-inner">
          <div className="auth-heading">
            <span className="auth-eyebrow">PERSONAL FINANCE, MADE SIMPLE</span>
            <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
            <p>
              {isSignup
                ? "Start with a fresh view of your finances."
                : "Sign in to pick up where you left off."}
            </p>
          </div>
          <div
            className="auth-switch"
            role="tablist"
            aria-label="Account access"
          >
            <button
              type="button"
              role="tab"
              aria-selected={!isSignup}
              className={!isSignup ? "selected" : ""}
              onClick={() => {
                setMode("login");
                setError("");
              }}
            >
              Sign in
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={isSignup}
              className={isSignup ? "selected" : ""}
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              Create account
            </button>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {isSignup && (
              <>
                <div className="avatar-picker">
                  <img
                    src={avatar || defaultAvatar(name || email || "Spendwise")}
                    alt="Profile preview"
                  />
                  <div>
                    <strong>Profile photo</strong>
                    <label htmlFor="avatar-upload">Upload a photo</label>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={chooseAvatar}
                  />
                </div>
                <label className="auth-field">
                  Your name
                  <input
                    autoComplete="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="e.g. Alex Morgan"
                    required
                  />
                </label>
              </>
            )}
            <label className="auth-field">
              Email address
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="auth-field">
              Password
              <input
                type="password"
                autoComplete={isSignup ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={
                  isSignup ? "At least 8 characters" : "Enter your password"
                }
                minLength={isSignup ? 8 : undefined}
                required
              />
            </label>
            {error && (
              <p className="auth-error" role="alert">
                {error}
              </p>
            )}
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Sign in"}
              <span aria-hidden="true">→</span>
            </button>
          </form>
          <p className="auth-privacy">
            Your financial records are private to your account.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Auth;
