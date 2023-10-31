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

export const getauthroute = getauth
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
export const loginroute = login
export const signuproute = signup
export const addtreatmentroute = addtreatment
export const addtreatmenttoboxroute = addtreatmenttobox
export const addfarmroute = addfarm
export const addsectionroute = addsection
export const addboxroute = addbox
export const logoutroute = logout
export const getcompanyusersroute = getcompanyusers
export const acceptuserroute = acceptuser