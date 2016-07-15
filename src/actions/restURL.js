const SERVICE_URL = 'http://10.10.40.7:8050/configUI'

//export const HOME_URL = 'http://10.10.40.7:8050/configUI/home';
export const HOME_SCREEN_URL = `${SERVICE_URL}/home`;

export const APP_TREE_URL = `${SERVICE_URL}/custom/tree/application`;
export const DC_TABLE_DATA_URL = `${SERVICE_URL}/application`;

export const ADD_ROW_DC_URL = `${SERVICE_URL}/custom/dcdetail`;
export const DEL_ROW_DC_URL = `${SERVICE_URL}/dcdetail`;

export const ADD_ROW_APP_URL = `${SERVICE_URL}/custom/application`;
export const DEL_ROW_APP_URL = `${SERVICE_URL}/application`;

export const FETCH_TOPO_TABLE_URL = `${SERVICE_URL}/custom/topology`;

export const FETCH_TOPO_TREE_URL = `${SERVICE_URL}/custom/tree/topology`;

export const DEL_TOPO_ROW_URL = `${SERVICE_URL}/dctopoassociation`;

export const FETCH_TIER_TREE_URL = `${SERVICE_URL}/custom/tree/tier`;

export const FETCH_SERVER_TREE_URL = `${SERVICE_URL}/custom/tree/server`;



export const FETCH_TIER_TABLE_URL = `${SERVICE_URL}/topology`;

export const FETCH_SERVER_TABLE_URL = `${SERVICE_URL}/tier`;





