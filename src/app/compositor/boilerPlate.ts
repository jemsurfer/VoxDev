import type { Routes } from '@/models/Route';

export function layoutBoilerPlate(routes: Routes[]): string {
  return `import { Outlet } from 'react-router'

export default function Layout(){
  return(

    <div>
      <nav>
        ${routes.map((value) => createAnchor(value.name)).join("\n")}
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}`;
}

function createAnchor(name: String): String {
  return `<a href="/${name}">${name}</a>`;
}

// TODO: Add imports
export function appBoilerPlate(routes: Routes[]) {
  return `import { Routes, Route } from "react-router"
import Layout from "./Layout"
${routes.map((value) => createImport(value.name)).join("\n")}

export default function App(){
  return(
    <Routes>
      <Route path="/" element={<Layout />}>
        ${routes.map((value) => createRoute(value.name, true)).join("\n")}
      </Route>
    </Routes>
  )
}`;
}

function createRoute(name: String, index: Boolean): String {
  var path = index ? "index" : `path="/${name}"`;
  return `<Route ${path} element={<${name} />} />`;
}

function createImport(name: string) {
  return `import ${name} from "./pages/${name}"`;
}
