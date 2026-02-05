// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   FlatList,
//   Image,
//   Text,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
//   Modal,
//   BackHandler,
//   Platform,
//   StatusBar,
// } from 'react-native';
// import Video from 'react-native-video';
// import { Focusable } from './Focusable'; // Custom focus management component

// // Dummy streaming video API data
// const DUMMY_VIDEOS_API = [
//   {
//     id: 1,
//     title: 'Nature Documentary',
//     thumbnail: 'https://picsum.photos/400/225?random=1',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
//     description: 'Explore the wonders of nature in this breathtaking documentary.'
//   },
//   {
//     id: 2,
//     title: 'Action Movie',
//     thumbnail: 'https://picsum.photos/400/225?random=2',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
//     description: 'A thrilling action movie with spectacular stunts.'
//   },
//   {
//     id: 3,
//     title: 'Sci-Fi Adventure',
//     thumbnail: 'https://picsum.photos/400/225?random=3',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
//     description: 'Journey through space in this epic sci-fi adventure.'
//   },
//   {
//     id: 4,
//     title: 'Comedy Special',
//     thumbnail: 'https://picsum.photos/400/225?random=4',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
//     description: 'Laugh out loud with this hilarious comedy special.'
//   },
//   {
//     id: 5,
//     title: 'Drama Series',
//     thumbnail: 'https://picsum.photos/400/225?random=5',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
//     description: 'An emotional drama series that will keep you hooked.'
//   },
//   {
//     id: 6,
//     title: 'Music Concert',
//     thumbnail: 'https://picsum.photos/400/225?random=6',
//     videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
//     description: 'Experience the energy of a live music concert.'
//   },
// ];

// const App = () => {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [modalVisible, setModalVisible] = useState(false);

//   // Simulate API call
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVideos(DUMMY_VIDEOS_API);
//       setLoading(false);
//     }, 1500);
    
//     return () => clearTimeout(timer);
//   }, []);

//   // Handle back button on Android TV
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
//       if (modalVisible) {
//         setModalVisible(false);
//         return true;
//       }
//       return false;
//     });

//     return () => backHandler.remove();
//   }, [modalVisible]);

//   const playVideo = (video) => {
//     setSelectedVideo(video);
//     setModalVisible(true);
//   };

//   const closeVideo = () => {
//     setModalVisible(false);
//     setSelectedVideo(null);
//   };

//   const renderVideoItem = ({ item, index }) => (
//     <Focusable 
//       onPress={() => playVideo(item)}
//       style={styles.videoItem}
//       focusedStyle={styles.videoItemFocused}
//     >
//       <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
//       <Text style={styles.videoTitle}>{item.title}</Text>
//     </Focusable>
//   );

//   if (loading) {
//     return (
//       <View style={styles.centerContainer}>
//         <ActivityIndicator size="large" color="#6200EE" />
//         <Text style={styles.loadingText}>Loading videos...</Text>
//       </View>
//     );
//   }

//   return (
//     // <SafeAreaView style={styles.safeArea}>
//     //   {/* Fixed StatusBar - removed for TV or set to hidden */}
//     //   <StatusBar hidden={true} />
      
//       <View style={styles.container}>
//         <Text style={styles.header}>Streaming TV App</Text>
        
//         <FlatList
//           data={videos}
//           renderItem={renderVideoItem}
//           keyExtractor={item => item.id.toString()}
//           numColumns={3}
//           contentContainerStyle={styles.listContainer}
//         />

//         <Modal
//           visible={modalVisible}
//           animationType="fade"
//           onRequestClose={closeVideo}
//         >
//           <View style={styles.videoContainer}>
//             {selectedVideo && (
//               <>
//                 <Video
//                   source={{ uri: selectedVideo.videoUrl }}
//                   style={styles.videoPlayer}
//                   controls={true}
//                   paused={false}
//                   resizeMode="contain"
//                   onError={(error) => console.error('Video error:', error)}
//                 />
//                 <View style={styles.videoInfo}>
//                   <Text style={styles.videoTitleModal}>{selectedVideo.title}</Text>
//                   <Text style={styles.videoDescription}>{selectedVideo.description}</Text>
//                 </View>
//                 <TouchableOpacity 
//                   style={styles.closeButton}
//                   onPress={closeVideo}
//                   hasTVPreferredFocus={true}
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </>
//             )}
//           </View>
//         </Modal>
//       </View>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#121212',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#121212',
//     paddingTop: 20, // Reduced padding since we're hiding StatusBar
//   },
//   centerContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#121212',
//   },
//   loadingText: {
//     color: 'white',
//     marginTop: 20,
//     fontSize: 18,
//   },
//   header: {
//     color: 'white',
//     fontSize: 32,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//   },
//   listContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 40,
//   },
//   videoItem: {
//     width: Dimensions.get('window').width / 3 - 30,
//     margin: 15,
//     backgroundColor: '#1E1E1E',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   videoItemFocused: {
//     transform: [{ scale: 1.05 }],
//     elevation: 10,
//     shadowColor: '#6200EE',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 10,
//     borderColor: '#6200EE',
//     borderWidth: 2,
//   },
//   thumbnail: {
//     width: '100%',
//     height: 150,
//   },
//   videoTitle: {
//     color: 'white',
//     padding: 10,
//     textAlign: 'center',
//     fontSize: 16,
//   },
//   videoContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//   },
//   videoPlayer: {
//     width: '100%',
//     height: Dimensions.get('window').height * 0.8,
//   },
//   videoInfo: {
//     padding: 20,
//   },
//   videoTitleModal: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   videoDescription: {
//     color: 'white',
//     fontSize: 18,
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//     backgroundColor: '#6200EE',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 5,
//   },
//   closeButtonText: {
//     color: 'white',
//     fontSize: 16,
//   },
// });

// export default App;








import React, { useState } from "react";
import {
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import Video from "react-native-video";
import VideoCard from "./components/VideoCard";

// Dummy video data (12 items)
const DUMMY_VIDEOS_API = [
  {
    id: "1",
    title: "Nature Documentary",
    thumbnail: "https://picsum.photos/400/225?random=1",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    id: "2",
    title: "Action Movie",
    thumbnail: "https://picsum.photos/400/225?random=2",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    id: "3",
    title: "Sci-Fi Adventure",
    thumbnail: "https://picsum.photos/400/225?random=3",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
  {
    id: "4",
    title: "Comedy Special",
    thumbnail: "https://picsum.photos/400/225?random=4",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
  {
    id: "5",
    title: "Drama Series",
    thumbnail: "https://picsum.photos/400/225?random=5",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  },
  {
    id: "6",
    title: "Music Concert",
    thumbnail: "https://picsum.photos/400/225?random=6",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
  {
    id: "7",
    title: "Wildlife Safari",
    thumbnail: "https://picsum.photos/400/225?random=7",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
  },
  {
    id: "8",
    title: "Cooking Show",
    thumbnail: "https://picsum.photos/400/225?random=8",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
  },
  {
    id: "9",
    title: "Travel Vlog",
    thumbnail: "https://picsum.photos/400/225?random=9",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4",
  },
  {
    id: "10",
    title: "Standup Comedy",
    thumbnail: "https://picsum.photos/400/225?random=10",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
  },
  {
    id: "11",
    title: "Short Film",
    thumbnail: "https://picsum.photos/400/225?random=11",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    id: "12",
    title: "Music Video",
    thumbnail: "https://picsum.photos/400/225?random=12",
    videoUrl:
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  },
];

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_VIDEOS_API}
        renderItem={({ item, index }) => (
          <VideoCard
            item={item}
            onPress={setSelectedVideo}
            autoFocus={index === 0}
          />
        )}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Video player modal */}
      <Modal visible={!!selectedVideo} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Video
            source={{ uri: selectedVideo?.videoUrl }}
            style={styles.video}
            controls
            resizeMode="contain"
            onEnd={() => setSelectedVideo(null)}
          />
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => setSelectedVideo(null)}
          >
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  video: { width: "90%", height: "60%" },
  closeBtn: {
    position: "absolute",
    top: 40,
    right: 30,
    padding: 10,
  },
  closeText: { color: "#fff", fontSize: 28 },
});
