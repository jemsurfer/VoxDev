export function layoutBoilerPlate(routes: Array<String>): string {
  return `
    export default function Layout(){
      return(
        import { Outlet } from 'react-router-dom'

        <div>
          <nav>
            ${routes.map((value) => createAnchor(value)).join("\n")}
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      )
    }
  `;
}

function createAnchor(name: String): String {
  return `<a href="/${name}">${name}</a>`;
}

// TODO: Add imports
export function appBoilerPlate(routes: Array<String>) {
  return `
    export default function App(){
      return(
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              ${routes.map((value) => createRoute(value, true)).join("\n")}
            </Route>
          </Routes>
        </Router>
      )
    }
  `;
}

function createRoute(name: String, index: Boolean): String {
  var path = index ? "index" : `path=/${name}`;
  return `<Route ${path} element={<${name} />} />`;
}
