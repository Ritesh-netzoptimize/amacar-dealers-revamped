/**
 * Example usage of rolePermissions utilities
 * This file demonstrates how to use the role-based access control utilities
 * in different parts of your application.
 */

import { 
  getUserPermissions, 
  canAccessDealerships, 
  canAccessSalesManagers,
  hasAnyRole,
  USER_ROLES 
} from './rolePermissions';

// Example 1: Using individual permission functions
export const ExampleComponent1 = ({ user }) => {
  const userRole = user?.role;
  
  return (
    <div>
      {canAccessDealerships(userRole) && (
        <button>Manage Dealerships</button>
      )}
      
      {canAccessSalesManagers(userRole) && (
        <button>Manage Sales Managers</button>
      )}
    </div>
  );
};

// Example 2: Using getAllPermissions for multiple checks
export const ExampleComponent2 = ({ user }) => {
  const userRole = user?.role;
  const permissions = getUserPermissions(userRole, user);
  
  return (
    <div>
      {permissions.canAccessDealerships && (
        <div>
          <h3>Dealership Management</h3>
          <button>View Dealerships</button>
          {permissions.canAccessInvitedDealerships && (
            <button>View Invited Dealerships</button>
          )}
        </div>
      )}
      
      {permissions.canAccessSalesManagers && (
        <div>
          <h3>Sales Manager Management</h3>
          <button>Manage Sales Managers</button>
        </div>
      )}
    </div>
  );
};

// Example 3: Using role checking utilities
export const ExampleComponent3 = ({ user }) => {
  const userRole = user?.role;
  
  // Check if user has admin or sales manager role
  const isAdminOrSalesManager = hasAnyRole(userRole, [
    USER_ROLES.ADMINISTRATOR, 
    USER_ROLES.SALES_MANAGER
  ]);
  
  return (
    <div>
      {isAdminOrSalesManager && (
        <div>
          <h3>Administrative Functions</h3>
          <p>You have administrative access</p>
        </div>
      )}
    </div>
  );
};

// Example 4: Conditional rendering based on permissions
export const NavigationExample = ({ user }) => {
  const userRole = user?.role;
  const permissions = getUserPermissions(userRole, user);
  
  const navigationItems = [
    { name: 'Dashboard', href: '/dashboard', show: true },
    { name: 'Dealerships', href: '/dealerships', show: permissions.canAccessDealerships },
    { name: 'Sales Managers', href: '/sales-managers', show: permissions.canAccessSalesManagers },
    { name: 'Reports', href: '/reports', show: true },
  ];
  
  return (
    <nav>
      {navigationItems
        .filter(item => item.show)
        .map(item => (
          <a key={item.name} href={item.href}>
            {item.name}
          </a>
        ))
      }
    </nav>
  );
};

// Example 5: API endpoint protection (for use in API routes or middleware)
export const checkPermission = (userRole, requiredPermission) => {
  const permissions = getUserPermissions(userRole);
  return permissions[requiredPermission] || false;
};

// Usage in API route:
// if (!checkPermission(user.role, 'canAccessDealerships')) {
//   return res.status(403).json({ error: 'Access denied' });
// }
