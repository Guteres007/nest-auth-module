import { SetMetadata } from '@nestjs/common'
import { Permission } from '@app/auth/enums/permission.enum'

export const PERMISSIONS_KEY = 'require-permissions'

export const RequirePermissions = (...permissions: Permission[]) => {
  return SetMetadata(PERMISSIONS_KEY, permissions)
}
