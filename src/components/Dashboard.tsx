
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsTable } from "./ProductsTable";
import { SuppliersTable } from "./SuppliersTable";
import { OrdersTable } from "./OrdersTable";
import { ConsumersTable } from "./ConsumersTable";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSummary } from "./DashboardSummary";

export function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <DashboardHeader />
      
      <main className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        </div>
        
        <DashboardSummary />
        
        <Tabs defaultValue="products" className="space-y-4">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="consumers">Consumers</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                  <CardDescription>
                    Manage all products in your e-commerce store
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductsTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="orders" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Orders</CardTitle>
                  <CardDescription>
                    Track and manage customer orders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdersTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="consumers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Consumers</CardTitle>
                  <CardDescription>
                    View and manage customer information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ConsumersTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Suppliers</CardTitle>
                  <CardDescription>
                    Manage your product suppliers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <SuppliersTable />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Dashboard;
