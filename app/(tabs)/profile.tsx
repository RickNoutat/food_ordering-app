import {View, Text, Image, TouchableOpacity, Alert, ScrollView} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {router} from "expo-router";
import useAuthStore from "@/store/auth.store";
import {signOut} from "@/lib/appwrite";
import {images} from "@/constants";
import {ProfileFieldProps} from "@/type";

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => (
    <View className="profile-field">
        <View className="profile-field__icon">
            <Image source={icon} className="size-5" resizeMode="contain" tintColor="#FE8C00" />
        </View>
        <View>
            <Text className="body-regular text-gray-200">{label}</Text>
            <Text className="paragraph-semibold text-dark-100">{value}</Text>
        </View>
    </View>
);

const Profile = () => {
    const { user, setIsAuthenticated, setUser } = useAuthStore();

    const handleLogout = () => {
        Alert.alert('Log out', 'Are you sure you want to log out?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Log out',
                style: 'destructive',
                onPress: async () => {
                    try {
                        await signOut();
                        setIsAuthenticated(false);
                        setUser(null);
                        router.replace('/sign-in');
                    } catch {
                        Alert.alert('Error', 'Could not log out. Please try again.');
                    }
                }
            }
        ]);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView contentContainerClassName="px-5 pb-28">
                <View className="flex-between flex-row w-full my-5">
                    <Text className="h3-bold text-dark-100">My Profile</Text>
                </View>

                <View className="items-center mb-8">
                    <View className="profile-avatar">
                        <Image
                            source={user?.avatar ? { uri: user.avatar } : images.avatar}
                            className="size-full rounded-full"
                            resizeMode="cover"
                        />
                        <TouchableOpacity className="profile-edit">
                            <Image source={images.pencil} className="size-full" resizeMode="contain" tintColor="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="h3-bold text-dark-100 mt-4">{user?.name ?? '—'}</Text>
                    <Text className="paragraph-medium text-gray-200">{user?.email ?? '—'}</Text>
                </View>

                <View className="bg-white rounded-2xl shadow-md shadow-black/10 p-5 mb-5">
                    <Text className="base-bold text-dark-100 mb-4">Account Details</Text>
                    <ProfileField label="Full Name" value={user?.name ?? '—'} icon={images.person} />
                    <ProfileField label="Email" value={user?.email ?? '—'} icon={images.envelope} />
                    <ProfileField label="Phone" value="Not set" icon={images.phone} />
                    <ProfileField label="Location" value="Not set" icon={images.location} />
                </View>

                <TouchableOpacity
                    onPress={handleLogout}
                    className="flex-row items-center gap-x-3 bg-red-50 rounded-2xl p-4"
                >
                    <Image source={images.logout} className="size-5" resizeMode="contain" tintColor="#EF4444" />
                    <Text className="paragraph-bold text-red-500">Log out</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
