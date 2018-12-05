/**
 * @name - Application State
 * @description - Defines the root level application state
 * @member appSettings - Application wide settings
 * @member connections - Global list of connections available to application
 * @member recentProjects - List of recently used projects
 * @member currentProject - The active project being edited
 */
export interface IApplicationState {
    appSettings: IAppSettings;
    connections: IConnection[];
    recentProjects: IProject[];
    currentProject: IProject;
}

/**
 * @name - Application settings
 * @description - Defines the root level configuration options for the application
 * @member devToolsEnabled - Whether dev tools are current open and enabled
 * @member connectionId - Reference to the connection used to store application settings
 * @member connection - Reference to the connection used to store the application settings
 */
export interface IAppSettings {
    devToolsEnabled: boolean;
    connectionId?: string;
    connection: IConnection;
}

/**
 * @name - Project
 * @description - Defines the structure of a VoTT project
 * @member id - Unique identifier
 * @member name - User defined name
 * @member description - User defined description
 * @member tags - User defined list of tags
 * @member sourceConnectionId - Reference ID for the source connection
 * @member sourceConnection - Full source connection details
 * @member targetConnectionId - Reference ID for the target connection
 * @member targetConnection - Full target connection details
 * @member exportFormat - Full export format definition
 * @member assets - Map of assets within a project
 * @member autoSave - Whether or not the project will automatically save updates to the underlying target
 */
export interface IProject {
    id: string;
    name: string;
    description?: string;
    tags: ITag[];
    sourceConnectionId?: string;
    sourceConnection: IConnection;
    targetConnectionId?: string;
    targetConnection: IConnection;
    exportFormat: IExportFormat;
    autoSave: boolean;
    assets?: { id: string, IAsset };
}

/**
 * @name - Tag
 * @description - Defines the structure of a VoTT tag
 * @member name - User defined name
 * @member color - User editable color associated to tag
 */
export interface ITag {
    name: string;
    color: string;
}

/**
 * @name - Connection
 * @description - Defines a reusable data source definition for projects
 * @member id - Unique identifier for connection
 * @member name - User defined name
 * @member description - User defined short description
 * @member providerType - The underlying storage type (Local File System, Azure Blob Storage, etc)
 * @member providerOptions - Provider specific options used to connect to the data source
 */
export interface IConnection {
    id: string;
    name: string;
    description?: string;
    providerType: string;
    providerOptions: object;
}

/**
 * @name - Export Format
 * @description - Defines the settings for how project data is exported into commonly used format
 * @member id - Unique identifier for export format
 * @member name - Name of export format
 * @member providerType - The export format type (TF Records, YOLO, CVS, etc)
 * @member providerOptions - The provider specific option required to export data
 */
export interface IExportFormat {
    id: string;
    name: string;
    providerType: string;
    providerOptions: object;
}

/**
 * @name - Asset
 * @description - Defines an asset within a VoTT project
 * @member id - Unique identifier for asset
 * @member type - Type of asset (Image, Video, etc)
 * @member name - Generated name for asset
 * @member path - Relative path to asset within the underlying data source
 * @member size - Size / dimensions of asset
 * @member format - The asset format (jpg, png, mp4, etc)
 */
export interface IAsset {
    id: string;
    type: AssetType;
    name: string;
    path: string;
    size: ISize;
    format?: string;
}

/**
 * @name - Asset Metadata
 * @description - Format to store asset metadata for each asset within a project
 * @member asset - References an asset within the project
 * @member timestamp - The timestamp of the asset typically used for video durations / frames
 */
export interface IAssetMetadata {
    asset: IAsset;
    regions: [];
    timestamp?: string;
}

/**
 * @name - Size
 * @description - Defines the size and/or diminsion for an asset
 * @member width - The actual width of an asset
 * @member height - The actual height of an asset
 */
export interface ISize {
    width: number;
    height: number;
}

/**
 * @name - Region
 * @description - Defines a region within an asset
 * @member id - Unique identifier for this region
 * @member type - Defines the type of region
 * @member tags - Defines a list of tags applied to a region
 * @member points - Defines a list of points that define a region
 */
export interface IRegion {
    id: string;
    type: RegionType;
    tags: ITagMetadata[];
    points: IPoint[];
}

/**
 * @name - Tag Metadata
 * @description - Defines the tag usage within a region
 * @member name - The tag name
 * @member properties - An object that defines addition metadata for this tag
 */
export interface ITagMetadata {
    name: string;
    properties: object;
}

/**
 * @name - Point
 * @description - Defines a point / coordinate within a region
 * @member x - The x value relative to the asset
 * @member y - The y value relative to the asset
 */
export interface IPoint {
    x: number;
    y: number;
}

/**
 * @name - Asset Type
 * @description - Defines the type of asset within a project
 * @member Image - Specifies an asset as an image
 * @member Video - Specifies an asset as a video
 */
enum AssetType {
    Image = 1,
    Video = 2,
}

/**
 * @name - Region Type
 * @description - Defines the region type within the asset metadata
 * @member Square - Specifies a region as a square
 * @member Rectangle - Specifies a region as a rectangle
 * @member Polygon - Specifies a region as a multi-point polygon
 */
enum RegionType {
    Square = "SQUARE",
    Rectangle = "RECTANGLE",
    Polygon = "POLYGON",
}
