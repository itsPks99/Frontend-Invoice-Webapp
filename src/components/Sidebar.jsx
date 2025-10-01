import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Home,
  Wallet,
  ShoppingBag,
  FileText,
  ReceiptIndianRupee,
  Settings,
  LogOut,
} from "lucide-react"



const AppSidebar = ({ 
  isCollapsed, 
  setIsCollapsed, 
  activeTab, 
  dropdownIndex, 
  setDropdownIndex, 
  handleTabChange, 
  handleLogout 
}) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-3">
          {!isCollapsed && (
            <img
              alt="Logo"
              src="/src/assets/logos/Asset 3@4x-100.jpg"
              className="h-8 w-auto"
            />
          )}
          <SidebarTrigger 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded-full hover:bg-sidebar-accent group"
          >
            {isCollapsed ? (
              <ChevronRight className="h-8 w-8 text-sidebar-foreground" />
            ) : (
              <ChevronLeft className="h-8 w-8 text-sidebar-foreground" />
            )}
            <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:inline-block bg-sidebar-primary text-sidebar-primary-foreground text-xs rounded px-2 py-1 shadow transition-opacity duration-300 opacity-0 group-hover:opacity-100 whitespace-nowrap">
              {isCollapsed ? "Expand navigation" : "Collapse navigation"}
            </span>
          </SidebarTrigger>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Dashboard */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => handleTabChange("home")}
                  isActive={activeTab === "home"}
                  tooltip="Dashboard"
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Sales & Payments */}
              <Collapsible
                open={dropdownIndex === "sales"}
                onOpenChange={() =>
                  setDropdownIndex(dropdownIndex === "sales" ? null : "sales")
                }
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={dropdownIndex === "sales"}
                      tooltip="Sales & Payments"
                    >
                      <Wallet className="h-5 w-5" />
                      <span>Sales & Payments</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {[
                        "estimates",
                        "invoices",
                        "recurring-invoices",
                        "customer-statements",
                        "customers",
                        "products",
                      ].map((tab) => (
                        <SidebarMenuSubItem key={tab}>
                          <SidebarMenuSubButton
                            onClick={() => handleTabChange(tab)}
                            isActive={activeTab === tab}
                          >
                            {tab === "recurring-invoices"
                              ? "Recurring Invoices"
                              : tab === "customer-statements"
                              ? "Customer Statements"
                              : tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Purchases */}
              <Collapsible
                open={dropdownIndex === "purchases"}
                onOpenChange={() =>
                  setDropdownIndex(dropdownIndex === "purchases" ? null : "purchases")
                }
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={dropdownIndex === "purchases"}
                      tooltip="Purchases"
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <span>Purchases</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {["bills", "purchase-orders", "vendors", "vendor-statements"].map(
                        (tab) => (
                          <SidebarMenuSubItem key={tab}>
                            <SidebarMenuSubButton
                              onClick={() => handleTabChange(tab)}
                              isActive={activeTab === tab}
                            >
                              {tab === "purchase-orders"
                                ? "Purchase Orders"
                                : tab === "vendor-statements"
                                ? "Vendor Statements"
                                : tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Accounting */}
              <Collapsible
                open={dropdownIndex === "accounting"}
                onOpenChange={() =>
                  setDropdownIndex(dropdownIndex === "accounting" ? null : "accounting")
                }
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={dropdownIndex === "accounting"}
                      tooltip="Accounting"
                    >
                      <FileText className="h-5 w-5" />
                      <span>Accounting</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {["statements", "templates"].map((tab) => (
                        <SidebarMenuSubItem key={tab}>
                          <SidebarMenuSubButton
                            onClick={() => handleTabChange(tab)}
                            isActive={activeTab === tab}
                          >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              {/* Banking */}
              <Collapsible
                open={dropdownIndex === "banking"}
                onOpenChange={() =>
                  setDropdownIndex(dropdownIndex === "banking" ? null : "banking")
                }
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      isActive={dropdownIndex === "banking"}
                      tooltip="Banking"
                    >
                      <ReceiptIndianRupee className="h-5 w-5" />
                      <span>Banking</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          Bank Accounts
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton>
                          Reconciliation
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleTabChange("settings")}
              isActive={activeTab === "settings"}
              tooltip="Settings"
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              tooltip="Log out"
              className="text-sidebar-foreground hover:text-red-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Log out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar