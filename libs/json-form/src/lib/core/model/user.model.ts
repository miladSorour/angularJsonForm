import { AddressModel } from "./address.model";
import { AuthModel } from "./auth.model";
import { SocialNetworksModel } from "./social-networks.model";
import { UserRole } from "./user-role.model";

export class UserModel extends AuthModel {
  id: number;
  username: string;
  password: string;
  email: string;
  pic: string;
  roles: number[] = [];
  occupation: string;
  companyName: string;
  phone: string;
  address?: AddressModel;
  socialNetworks?: SocialNetworksModel;
  // personal information
  firstname: string;
  lastname: string;
  website: string;
  // account information
  language: string;
  timeZone: string;
  firstName?:                      string;
  lastName?:                       string;
  fullName?:                       string;
  fileCode?:                       string;
  visitedCount?:                   number;
  lastVisitDate?:                  string;
  enabled?:                        boolean;
  online?:                         boolean;
  admin?:                          boolean;
  verify?:                         boolean;
  personnelId?:                    number;
  organizationId?:                 number;
  organizationName?:               string;
  organizationHierarchyCode?:      string;
  hierarchyCodeSet?:               boolean;
  personnelFileCode?:              string;
  personnelNationalNumber?:        string;
  personnelPersonnelCode?:         string;
  personnelBirthLocation?:         string;
  personnelRegisterLocation?:      string;
  userRoles?:                      UserRole[];
  roleTitle?:                      string;
  roleId?:                         number;
  groupTitle?:                      string;
  groupId?:                         number;
  hierarchyGroupSet?:               boolean;
  groupHierarchyCode?:              string;
  classificationId?:                number;
  classificationTopic?:             string;
  failedAttempt?:                   number;

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.id = user.id;
    this.username       = user.username || '';
    this.password       = user.password || '';
    this.fullName       = user.fullName || '';
    this.email          = user.email || '';
    this.pic            = user.pic || './assets/media/users/default.jpg';
    this.roles          = user.roles || [];
    this.occupation     = user.occupation || '';
    this.companyName    = user.companyName || '';
    this.phone          = user.phone || '';
    this.address        = user.address;
    this.socialNetworks = user.socialNetworks;
    this.visitedCount   = 0;
    this.online         = true;
    this.admin          = false;
    this.enabled        = true;
  }
}
