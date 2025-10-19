import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

//import { router } from "./routes";
export default function App() {
  
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router}/>
     <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
