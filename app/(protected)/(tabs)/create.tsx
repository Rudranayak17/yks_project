import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Alert,
  Linking,
  Text,
  Pressable,
  Platform,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

interface Album {
  id: string;
  title: string;
  assetCount?: number;
}

interface Asset {
  id: string;
  uri: string;
}

const Create = () => {
  const router = useRouter();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [permissionResponse, requestMediaLibraryPermission] =
    MediaLibrary.usePermissions();
  const [imagePickerPermissionResponse, requestImagePickerPermission] =
    ImagePicker.useMediaLibraryPermissions();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Request permissions for both ImagePicker and MediaLibrary
  const requestPermissions = async () => {
    if (Platform.OS === "android" && permissionResponse.status !== "granted") {
      const permissionResult = await requestMediaLibraryPermission(); // Renamed here
      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "This app needs permission to access your gallery. Please grant access in the settings.",
          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel" },
          ]
        );
        return;
      }
    }

    if (imagePickerPermissionResponse.status !== "granted") {
      const permissionResult = await requestImagePickerPermission(); // Renamed here
      if (permissionResult.status !== "granted") {
        Alert.alert(
          "Permission Required",
          "This app needs permission to access your gallery. Please grant access in the settings.",
          [
            {
              text: "Go to Settings",
              onPress: () => Linking.openSettings(),
            },
            { text: "Cancel" },
          ]
        );
        return;
      }
    }
  };

  // Get albums based on platform
  const getAlbums = async () => {
    await requestPermissions();

    if (Platform.OS === "android") {
      // Use MediaLibrary for Android
      const fetchedAlbums = await MediaLibrary.getAlbumsAsync({
        includeSmartAlbums: true,
      });
      setAlbums(fetchedAlbums);
    } else {
      // For iOS, no albums, just show image picker (single library)
      setAlbums([{ id: "1", title: "Photos" }]); // Placeholder for iOS
    }
  };

  // Pick image based on platform
  const pickImage = async () => {
    await requestPermissions();

    if (Platform.OS === "android") {
      // Launch image picker for Android using MediaLibrary
      const assets = await MediaLibrary.getAssetsAsync({
        first: 10, // Optionally limit the number of assets to fetch
      });
      if (assets.assets.length > 0) {
        setSelectedImage(assets.assets[0].uri);
      }
    } else {
      // Launch image picker for iOS using expo-image-picker
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1, // Adjust image quality if needed
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === "android" ? (
        <Button onPress={getAlbums} title="Get Albums" />
      ) : (
        <Button onPress={pickImage} title="Pick an Image" />
      )}
      {Platform.OS === "android" ? (
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {albums &&
            albums.map((album) => (
              <AlbumEntry
                key={album.id}
                album={album}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            ))}
        </ScrollView>
      ) : null}

      {selectedImage && (
        <View style={styles.selectedImageContainer}>
          <Text style={styles.selectedImageText}>Selected Image:</Text>
          <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
        </View>
      )}

      <Pressable
        style={[
          styles.nextButton,
          selectedImage ? styles.activeButton : styles.disabledButton,
        ]}
        onPress={() => {
          if (selectedImage) {
            Alert.alert("Next", "You have selected an image!");
          }
          router.push({
            pathname: "/createPost",
            params: { selectedImage },
          });
        }}
        disabled={!selectedImage}
      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </SafeAreaView>
  );
};

interface AlbumEntryProps {
  album: Album;
  selectedImage: string | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const AlbumEntry: React.FC<AlbumEntryProps> = ({
  album,
  selectedImage,
  setSelectedImage,
}) => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    const getAlbumAssets = async () => {
      if (album.id && Platform.OS === "android") {
        const albumAssets = await MediaLibrary.getAssetsAsync({
          album: album.id,
          first: 10, // Optionally limit the number of assets to fetch
        });
        setAssets(albumAssets.assets);
      }
    };
    getAlbumAssets();
  }, [album]);

  return (
    <View style={styles.albumContainer}>
      <Text style={styles.albumTitle}>{album.title}</Text>
      <View style={styles.albumAssetsContainer}>
        {assets.map((asset) => (
          <Pressable
            key={asset.id}
            style={[
              styles.imageWrapper,
              asset.uri === selectedImage ? styles.selectedImageBorder : null,
            ]}
            onPress={() => setSelectedImage(asset.uri)}
          >
            <Image source={{ uri: asset.uri }} style={styles.image} />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  albumContainer: {
    marginBottom: 20,
  },
  albumTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  albumAssetsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageWrapper: {
    width: "30%",
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  image: {
    width: "100%",
    height: 100,
    borderRadius: 8,
  },
  selectedImageBorder: {
    borderColor: "#4CAF50", // Green border for selected images
  },
  selectedImageContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  selectedImageText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  selectedImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  nextButton: {
    backgroundColor: "#6200EE",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeButton: {
    backgroundColor: "#6200EE",
  },
  disabledButton: {
    backgroundColor: "#D3D3D3",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Create;
