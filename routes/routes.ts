import getauth from './getauth'
import getunacceptedusers from './getunacceptedusers'
import gettreatedboxes from './gettreatedboxes'
import getprevioustreatments from './getprevtreatments'
import gettreatments from './gettreatments'
import createcompany from './createcompany'
import checkcompanycode from './checkcompanycode'
import getcurrentcompany from './getcurrentcompany'
import getfarms from './getfarms'
import getsections from './getsections'
import getboxes from './getboxes'
import login from './login'
import signup from './signup'
import addtreatment from './addtreatment'
import addfarm from './addfarm'
import addsection from './addsection'
import addbox from './addbox'
import logout from './logout'
import addtreatmenttobox from './addtreatmenttobox'
import getcompanyusers from './getcompanyusers'
import acceptuser from './acceptuser'
import deleteaccount from './deleteaccount'
import deletepersonalboxtreatment from './deletepersonalboxtreatment'
import deleteboxtreatment from './deleteboxtreatment'
import getcompanies from './getcompanies'
import deletecompany from './deletecompany'
import createcompanyadmin from './createcompanyadmin'
import createadmin from './createadmin'
import getusers from './getusers'
import adminupdateuser from './adminupdateuser'
import updatecompany from './updatecompany'
import companyedituser from './companyedituser'

export const getauthroute = getauth
export const getusersroute = getusers
export const getunacceptedusersroute = getunacceptedusers
export const gettreatedboxesroute = gettreatedboxes
export const getprevioustreatmentsroute = getprevioustreatments
export const gettreatmentsroute = gettreatments
export const createcompanyroute = createcompany
export const checkcompanycoderoute = checkcompanycode
export const getcurrentcompanyroute = getcurrentcompany
export const getfarmsroute = getfarms
export const getsectionsroute = getsections
export const getboxesroute = getboxes
export const getcompaniesroute = getcompanies
export const loginroute = login
export const signuproute = signup
export const deleteaccountroute = deleteaccount
export const deletepersonalboxtreatmentroute = deletepersonalboxtreatment
export const deleteboxtreatmentroute = deleteboxtreatment
export const deletecompanyroute = deletecompany
export const addtreatmentroute = addtreatment
export const addtreatmenttoboxroute = addtreatmenttobox
export const addfarmroute = addfarm
export const addsectionroute = addsection
export const addboxroute = addbox
export const logoutroute = logout
export const getcompanyusersroute = getcompanyusers
export const acceptuserroute = acceptuser
export const createcompanyadminroute = createcompanyadmin
export const createadminroute = createadmin
export const adminupdateuserroute = adminupdateuser
export const updatecompanyroute = updatecompany
export const companyedituserroute = companyedituser