/**
 * App-Router templates re-mount on every navigation, so this gives each page a
 * fresh content enter animation (a soft fade) that plays underneath the
 * PageTransition wipe revealing it.
 *
 * The fade is CSS, not Framer, and deliberately so: as a `motion.div` with
 * `initial={{ opacity: 0 }}` this wrapper was server-rendered as
 * `style="opacity:0"`, so *every page* stayed blank until React and
 * framer-motion had downloaded, parsed and hydrated — first paint landed at
 * ~7.3s. A CSS animation runs at first paint with no JS, and keeps this a
 * server component so the bundle no longer reaches every route through it.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-enter">{children}</div>;
}
