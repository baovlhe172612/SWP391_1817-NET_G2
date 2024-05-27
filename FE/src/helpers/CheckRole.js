export const hasRole = (userRole, allowedRoles) => {
  return allowedRoles.includes(userRole);
};
