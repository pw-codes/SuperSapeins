import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { athletes, SPORTS } from "../data/mock";
import { useStore } from "../store";
import { Btn, Field, Photo } from "../components/ui";
import { Brand } from "../components/Brand";
const Wrap = ({
  t,
  sub,
  children,
}: {
  t: string;
  sub: string;
  children: React.ReactNode;
}) => (
  <div className="grid min-h-screen place-items-center px-4">
    <div className="w-full max-w-sm">
      <Link to="/" aria-label="SUPER SAPIEN home">
        <Brand />
      </Link>
      <h1 className="mt-6 text-3xl font-extrabold">{t}</h1>
      <p className="mt-1 text-sm text-mute">{sub}</p>
      <div className="mt-6 space-y-4">{children}</div>
      <p className="mt-6 text-xs text-mute">
        Prototype: nothing is sent to a server.
      </p>
    </div>
  </div>
);
const em = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
function useForm(onOk: (v: any) => void, pw = true) {
  const [e, setE] = useState<any>({});
  const submit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const v = Object.fromEntries(new FormData(ev.currentTarget)) as any;
    const x: any = {};
    if (!em.test(v.email || "")) x.email = "Enter a valid email address";
    if (pw && (v.password || "").length < 8)
      x.password = "Use at least 8 characters";
    setE(x);
    if (!Object.keys(x).length) onOk(v);
  };
  return { e, submit };
}
export function Login() {
  const nav = useNavigate();
  const { toast } = useStore();
  const { e, submit } = useForm(() => {
    toast("Signed in (demo)");
    nav("/app");
  });
  return (
    <Wrap t="Welcome back" sub="Sign in to continue.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field label="Email" name="email" type="email" error={e.email} />
        <Field
          label="Password"
          name="password"
          type="password"
          error={e.password}
        />
        <Link to="/forgot-password" className="block text-xs text-lime">
          Forgot password?
        </Link>
        <Btn className="w-full">Sign in</Btn>
      </form>
      <p className="text-sm text-mute">
        New here?{" "}
        <Link to="/signup" className="text-lime">
          Create an account
        </Link>
      </p>
    </Wrap>
  );
}
export function Signup() {
  const nav = useNavigate();
  const { set } = useStore();
  const { e, submit } = useForm((v) => {
    if (v.name) set({ name: v.name });
    nav("/onboarding");
  });
  return (
    <Wrap t="Create your account" sub="Start discovering talent.">
      <form onSubmit={submit} className="space-y-4" noValidate>
        <Field label="Full name" name="name" />
        <Field label="Email" name="email" type="email" error={e.email} />
        <Field
          label="Password"
          name="password"
          type="password"
          error={e.password}
        />
        <Btn className="w-full">Create account</Btn>
      </form>
      <p className="text-sm text-mute">
        Have an account?{" "}
        <Link to="/login" className="text-lime">
          Sign in
        </Link>
      </p>
    </Wrap>
  );
}
export function Forgot() {
  const [done, setDone] = useState(false);
  const { e, submit } = useForm(() => setDone(true), false);
  return (
    <Wrap
      t="Reset your password"
      sub="Enter your email and we’ll show the next step."
    >
      {done ? (
        <p className="rounded-xl border border-line bg-card p-4 text-sm">
          Demo only: no email was sent. In production, a reset link would arrive
          here.
        </p>
      ) : (
        <form onSubmit={submit} className="space-y-4" noValidate>
          <Field label="Email" name="email" type="email" error={e.email} />
          <Btn className="w-full">Send reset link</Btn>
        </form>
      )}
      <Link to="/login" className="text-sm text-lime">
        Back to sign in
      </Link>
    </Wrap>
  );
}
const INT = [
  "Rising stars",
  "Match analysis",
  "Transfers and contracts",
  "Youth development",
  "Training science",
  "Records",
];
export function Onboarding() {
  const { s, set, toggle } = useStore();
  const nav = useNavigate();
  const [i, setI] = useState(0);
  const [ints, setInts] = useState<string[]>([]);
  const [name, setName] = useState(s.name);
  const tg = (a: string[], x: string) =>
    a.includes(x) ? a.filter((y) => y !== x) : [...a, x];
  const steps = [
    <div>
      <h2 className="text-3xl font-extrabold">Welcome to SUPER SAPIEN</h2>
      <p className="mt-2 text-mute">Four quick steps to tailor your feed.</p>
    </div>,
    <div>
      <h2 className="text-2xl font-extrabold">
        Pick your favourite disciplines
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SPORTS.map((x) => (
          <button
            key={x}
            onClick={() => set({ sports: tg(s.sports, x) })}
            className={`rounded-2xl border p-5 text-left font-semibold ${s.sports.includes(x) ? "border-lime bg-lime/10" : "border-line bg-card"}`}
          >
            {x}
          </button>
        ))}
      </div>
    </div>,
    <div>
      <h2 className="text-2xl font-extrabold">Follow some emerging talent</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {athletes
          .filter((a) => s.sports.length === 0 || s.sports.includes(a.sport))
          .slice(0, 8)
          .map((a) => (
            <button
              key={a.id}
              onClick={() => toggle("follow", a.id)}
              className={`rounded-2xl border p-2 text-left text-sm ${s.follow.includes(a.id) ? "border-lime" : "border-line"}`}
            >
              <Photo a={a} className="mb-2 h-20 w-full rounded-xl" />
              {a.name}
            </button>
          ))}
      </div>
    </div>,
    <div>
      <h2 className="text-2xl font-extrabold">Choose your interests</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {INT.map((x) => (
          <button
            key={x}
            onClick={() => setInts(tg(ints, x))}
            className={`rounded-full border px-4 py-2 text-sm ${ints.includes(x) ? "border-lime bg-lime text-bg" : "border-line"}`}
          >
            {x}
          </button>
        ))}
      </div>
    </div>,
    <div>
      <h2 className="text-2xl font-extrabold">Personalize your experience</h2>
      <div className="mt-4 max-w-sm space-y-4">
        <Field
          label="Display name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label className="block text-sm">
          <span className="mb-1 block text-mute">Density</span>
          <select
            className="w-full"
            value={s.density}
            onChange={(e) => set({ density: e.target.value })}
          >
            <option value="comfortable">Comfortable</option>
            <option value="compact">Compact</option>
          </select>
        </label>
      </div>
    </div>,
    <div>
      <h2 className="text-3xl font-extrabold">You’re all set</h2>
      <p className="mt-2 text-mute">
        Following {s.follow.length} talents across {s.sports.length}{" "}
        disciplines.
      </p>
    </div>,
  ];
  const last = i === steps.length - 1;
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-8">
      <div className="flex gap-1">
        {steps.map((_, k) => (
          <div
            key={k}
            className={`h-1 flex-1 rounded-full ${k <= i ? "bg-lime" : "bg-line"}`}
          />
        ))}
      </div>
      <div className="flex-1 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
          >
            {steps[i]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-between">
        <Btn v="ghost" disabled={i === 0} onClick={() => setI(i - 1)}>
          Back
        </Btn>
        <Btn
          onClick={() => {
            if (last) {
              set({ name: name || s.name });
              nav("/app");
            } else setI(i + 1);
          }}
        >
          {last ? "Go to dashboard" : "Continue"}
        </Btn>
      </div>
    </div>
  );
}
