//const SERVICE_URL = '/configUI';

//export const  SERVICE_URL = 'http://10.10.40.77:8090';
export const  SERVICE_URL = 'http://10.10.40.77/configUI';
//export const  SERVICE_URL = 'http://localhost:8090';

/* Url for Home Screen */
export const HOME_SCREEN_URL = `${SERVICE_URL}/home`;
export const UPDATE_TOPOLOGY = `${SERVICE_URL}/uploadtesting`;
/* Url for Application Table */
export const FETCH_APP_TABLE_DATA = `${SERVICE_URL}/application`;
export const APP_TREE_URL = `${SERVICE_URL}/custom/tree/application`;
export const ADD_ROW_APP_URL = `${SERVICE_URL}/custom/application`;
export const DEL_ROW_APP_URL = `${SERVICE_URL}/application`;

/* Url for DCDetail */
export const DC_TABLE_DATA_URL = `${SERVICE_URL}/application`;
export const ADD_ROW_DC_URL = `${SERVICE_URL}/custom/dcdetail`;
export const DEL_ROW_DC_URL = `${SERVICE_URL}/dcdetail`;

/* Url for Topology */
export const FETCH_TOPO_TABLE_URL = `${SERVICE_URL}/custom/topology`;
export const FETCH_TOPO_TREE_URL = `${SERVICE_URL}/custom/tree/topology`;
export const DEL_TOPO_ROW_URL = `${SERVICE_URL}/dctopoassociation`;
export const ATTACH_PROFTO_TOPO = `${SERVICE_URL}/custom/topology`;
export const ADD_ROW_TOPOLOGY_URL = `${SERVICE_URL}/custom/topology`;
export const TOGGLE_STATE_TOPOLOGY = `${SERVICE_URL}/custom/topology`;

/* Url for Profiles */
export const FETCH_PROFILE_TABLEDATA = `${SERVICE_URL}/profiles`
export const UPDATE_PROFILE_TABLE = ` ${SERVICE_URL}/profiles`

/* Url for Tier */
export const FETCH_TIER_TREE_URL = `${SERVICE_URL}/custom/tree/tier`;
//export const FETCH_TIER_TABLE_URL = `${SERVICE_URL}/topology`;
export const FETCH_TIER_TABLE_URL = `${SERVICE_URL}/custom/tier`;
export const ATTACH_PROFTO_TIER = `${SERVICE_URL}/custom/tier`;


/* Url for Server */
export const FETCH_SERVER_TREE_URL = `${SERVICE_URL}/custom/tree/server`;
export const FETCH_SERVER_TABLE_URL = `${SERVICE_URL}/custom/server`;
export const ATTACH_PROFTO_SERVER = `${SERVICE_URL}/custom/server`;

/* Url for Instance */
export const FETCH_INSTANCE_TREE_URL = `${SERVICE_URL}/custom/tree/instance`;
export const FETCH_INSTANCE_TABLE_URL = `${SERVICE_URL}/custom/instance`;
export const ATTACH_PROFTO_INSTANCE = `${SERVICE_URL}/custom/instance`;

/* Url for ServiceEntryPoint */
export const FETCH_SERVICE_POINTS_TABLEDATA = `${SERVICE_URL}/custom/profileserviceentryasso`;
export const FETCHING_SERVICE_ENTRYPOINTS_FORM = `${SERVICE_URL}/entryTypes`;
export const  ADD_NEW_SERVICE_ENTRY_POINTS = `${SERVICE_URL}/custom/profileserviceentryasso`;
export const DEL_SERVICE_ENTRY_POINTS = `${SERVICE_URL}/profileserviceentryasso`;

/*Url for Toggle */ 
export const UPDATE_TOGGLE_PROFSEPASSOC = ` ${SERVICE_URL}/custom/profileserviceentryasso` ;

/* Url fot BussinessTransaction */
export const ADD_BT = `${SERVICE_URL}/custom/btGlobal`;
export const GET_BT = `${SERVICE_URL}/profiles`;
export const FETCH_LIST_GROUP_NAMES_FORM = `${SERVICE_URL}/btgroup`;
export const FETCH_BT_PATTERN_TABLEDATA = `${SERVICE_URL}/custom/btpattern`;
export const ADD_NEW_BT_PATTERN_DETAILS = `${SERVICE_URL}/custom/btpattern`;
export const ADD_NEW_BT_GROUP_DETAILS = `${SERVICE_URL}/custom/btpattern/addGroup`;

/* Url for Backend Detection */
export const FETCH_BACKEND_TABLEDATA = `${SERVICE_URL}/custom/backenddetection`;
export const FETCH_BACKEND_TYPES = `${SERVICE_URL}/backendTypes`;
export const ADD_NEW_BACKEND_POINT = `${SERVICE_URL}/custom/backenddetection`


export const FETCH_ALL_TOPODATA = `${SERVICE_URL}/topology`;

/* Url for General Keywords Screen*/
export const GET_KEYWORDS_DATA = `${SERVICE_URL}/custom/profilekeywords` ;
export const UPDATE_KEYWORDS_DATA = `${SERVICE_URL}/custom/profilekeywords`;