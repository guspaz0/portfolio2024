export interface CloudinaryUploadedFile {
    /** Unique identifier for the asset */
    asset_id: string;
    /** Public identifier for the asset */
    public_id: string;
    /** Version number of the asset */
    version: number;
    /** Unique identifier for the version */
    version_id: string;
    /** Signature for the asset */
    signature: string;
    /** Width of the asset in pixels */
    width: number;
    /** Height of the asset in pixels */
    height: number;
    /** File format of the asset */
    format: string;
    /** Type of resource (e.g., image) */
    resource_type: string;
    /** Timestamp when the asset was created */
    created_at: string;
    /** Tags associated with the asset */
    tags: string[];
    /** Size of the asset in bytes */
    bytes: number;
    /** Type of upload (e.g., 'upload') */
    type: string;
    /** ETag for the asset */
    etag: string;
    /** Placeholder flag for the asset */
    placeholder: boolean;
    /** URL for the asset */
    url: string;
    /** Secure URL for the asset */
    secure_url: string;
    /** Folder containing the asset */
    folder: string;
    /** Original filename of the asset */
    original_filename: string;
    /** API key used for the upload */
    api_key: string;
}