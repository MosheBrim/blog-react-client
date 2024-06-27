import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Posts from "./pages/Posts";
import NotFound from "./pages/NotFound";
import PostContent from "./pages/PostContent";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdminRootLayout from "./pages/admin/AdminRootLayout";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminComments from "./pages/admin/AdminComments";
import AdminUsers from "./pages/admin/AdminUsers";
import Main from "./pages/Main";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Outlet />}>
        <Route index element={<Main/>}/>
        <Route path="/home" >
          <Route index element={<Posts />} />
          <Route path="post/:id" element={<PostContent />} />
          <Route path="admin" element={<AdminRootLayout />}>
            <Route path=":user/posts" element={<AdminPosts />} />
            <Route path=":user/comments" element={<AdminComments />} />
            <Route path=":user/users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    )
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
