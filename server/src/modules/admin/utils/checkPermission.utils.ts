export const REQUIRED_ROLES_OWNER = ['owner'];
export const REQUIRED_ROLES_ADMIN = ['admin', 'owner'];
export const REQUIRED_ROLES_MANAGER = ['manager', 'admin', 'owner'];

export const isOwner = ({ currentAdmin }) => {
  return check(currentAdmin, REQUIRED_ROLES_OWNER);
};

export const isAdmin = ({ currentAdmin }) => {
  return check(currentAdmin, REQUIRED_ROLES_ADMIN);
};

export const isManager = ({ currentAdmin }) => {
  return check(currentAdmin, REQUIRED_ROLES_MANAGER);
};
const check = ({ role }, requiredRoles: string[]) => {
  return requiredRoles.includes(role);
};
