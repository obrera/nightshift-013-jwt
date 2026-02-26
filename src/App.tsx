import { useMemo, useState } from 'react'

type JwtPayload = Record<string, unknown>

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4)
  return atob(padded)
}

function prettyJson(input: unknown): string {
  return JSON.stringify(input, null, 2)
}

function App() {
  const [token, setToken] = useState('')

  const parsed = useMemo(() => {
    if (!token.trim()) {
      return {
        error: null,
        header: null,
        payload: null,
        signature: null,
      }
    }

    const parts = token.trim().split('.')

    if (parts.length !== 3) {
      return {
        error: 'JWT must have exactly 3 parts separated by dots.',
        header: null,
        payload: null,
        signature: null,
      }
    }

    try {
      const header = JSON.parse(decodeBase64Url(parts[0])) as JwtPayload
      const payload = JSON.parse(decodeBase64Url(parts[1])) as JwtPayload

      return {
        error: null,
        header,
        payload,
        signature: parts[2],
      }
    } catch {
      return {
        error: 'Failed to decode JWT. Check if it is valid Base64URL-encoded JSON.',
        header: null,
        payload: null,
        signature: null,
      }
    }
  }, [token])

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <p className="inline-flex rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-300">
            Nightshift 013
          </p>
          <h1 className="text-3xl font-bold sm:text-4xl">JWT Inspector</h1>
          <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
            Paste any JWT to decode its header and payload instantly. Parsing happens entirely in your browser.
          </p>
        </header>

        <section className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">
          <label className="block text-sm font-medium text-slate-200" htmlFor="token">
            JWT Token
          </label>
          <textarea
            id="token"
            value={token}
            onChange={(event) => {
              setToken(event.target.value)
            }}
            placeholder="eyJhbGciOi..."
            className="h-32 w-full rounded-xl border border-slate-700 bg-slate-950 p-3 font-mono text-xs text-slate-100 outline-none ring-sky-400/40 transition focus:ring-2"
          />
          {parsed.error ? (
            <p className="rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">{parsed.error}</p>
          ) : null}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="mb-2 text-lg font-semibold text-sky-300">Header</h2>
            <pre className="overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-200">
              <code>{parsed.header ? prettyJson(parsed.header) : '—'}</code>
            </pre>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h2 className="mb-2 text-lg font-semibold text-sky-300">Payload</h2>
            <pre className="overflow-auto rounded-xl bg-slate-950 p-3 text-xs text-slate-200">
              <code>{parsed.payload ? prettyJson(parsed.payload) : '—'}</code>
            </pre>
          </article>
        </section>

        <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h2 className="mb-2 text-lg font-semibold text-sky-300">Signature</h2>
          <p className="break-all rounded-xl bg-slate-950 p-3 font-mono text-xs text-slate-200">
            {parsed.signature ?? '—'}
          </p>
        </section>
      </div>
    </main>
  )
}

export default App
