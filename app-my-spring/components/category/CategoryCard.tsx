import React from 'react'
import {View, Image, Text, TouchableOpacity} from 'react-native'
import { IMAGES_URL } from '@/constants/Urls'
import { ICategoryItem } from "@/interfaces/category";

interface CategoryCardProps {
    category: ICategoryItem
    onPress: () => void
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {

    console.log(`${IMAGES_URL}/200_${category.image}`);
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                className={`flex flex-1 bg-white rounded-md p-2 items-center shadow-sm shadow-white relative`}>
                <Image source={{ uri: `${IMAGES_URL}/200_${category.image}` }} className="w-24 h-24 rounded-full mb-2" />
                <Text className="text-lg font-semibold mb-1">{category.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard