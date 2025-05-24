import * as FileSystem from 'expo-file-system';
import {IMAGES_URL} from "@/constants/Urls";

export const getFileFromUriAsync = async (uri: string) => {

    if (uri.startsWith(IMAGES_URL)){
        return {
            uri,
            name: uri.split('_').pop(),
            type: 'image/old',
        }
    }

    const fileInfo = await FileSystem.getInfoAsync(uri)
    if (fileInfo.exists) {
        return {
            uri,
            name: uri.split('/').pop(),
            type: 'image/jpeg',
        }
    }
    return null;
}