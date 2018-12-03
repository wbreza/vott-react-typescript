import { IAsset, AssetType } from "../store/applicationState";
import MD5 from "md5.js";

export class AssetService {
    public static createAssetFromFilePath(filePath: string): IAsset {
        const md5Hash = new MD5().update(filePath).digest("hex");
        const pathParts = filePath.indexOf("\\") > 0 ? filePath.split("\\") : filePath.split("/");
        const fileName = pathParts[pathParts.length - 1];
        const fileNameParts = fileName.split(".");
        const assetFormat = fileNameParts[fileNameParts.length - 1];
        const assetType = this.getAssetType(assetFormat);

        return {
            id: md5Hash,
            format: assetFormat,
            type: assetType,
            name: fileName,
            path: filePath,
            size: null,
        };
    }

    public static getAssetType(format: string): AssetType {
        switch (format.toLowerCase()) {
            case "gif":
            case "jpg":
            case "jpeg":
            case "tif":
            case "tiff":
            case "png":
            case "bmp":
                return AssetType.Image;
            case "mp4":
            case "mov":
            case "avi":
            case "m4v":
            case "mpg":
            case "wmv":
                return AssetType.Video;
            default:
                return AssetType.Unknown;
        }
    }
}
