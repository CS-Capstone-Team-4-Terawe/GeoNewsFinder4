// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Text, Button } from 'react-native';
// import { ask, summarize, NewsArticle } from '../utils/openAIGPTFunctions'; 

// let article = new NewsArticle(
//   "A potential Las Vegas workers strike could throw a wrench in the upcoming F1 race",
//   ["Hernandez", "Joe"],
//   "Monday, November 6, 2023 • 5:00 AM EST",
//   "Tens of thousands of L... construction-related traffic jams"
// );

// async function tempo() {
//   let response = await summarize(article);
//   // console.log("tempo"+response.message.content)
//   return response.message.content;
// }

// let summary = tempo();



// function ArticleSynopsisView() {
//   const [summary, setSummary] = useState('Loading...');

//   const getSummary = async () => {
//     let response = await summarize(article);
    
//     setSummary(response);
//   }

//   // useEffect(() => {
//   //   getSummary();
//   // }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.modalText}>{summary}</Text>
//       <Button
// 				buttonColor="bg-blue-600"
// 				textColor="text-white"
// 				onPress={async () => {
// 					await getSummary(); 
// 				}}
//         title="Y0"
// 			/>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#fff',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   });

// export default ArticleSynopsisView;


import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import { Button } from "@digital-art-dealers/react-native-component-lib";

import useLocalize from "../hooks/useLocalize";
import { TRANSLATIONS } from "../utils/translations/translations";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import  { Configuration, OpenAIApi } from "openai"; 
import { TextInput } from "react-native-gesture-handler";

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_API_KEY
});


const HomeScreen = () => {
	const navigation = useNavigation();
	const { translate } = useLocalize();
	const openai = new OpenAIApi(configuration);


	const [image, setImage] = useState(null);
	const [imagePrompt, setImagePrompt] = useState(null);
	const [isLoading, setIsLoading] = useState(null); 

	const [error, setError] = useState(null);

	const generateImage = async () => {
		setIsLoading(true);
		setError(null);
		try{
			const response = await openai.createImage({
				prompt: imagePrompt,
				n: 1,
				size: "1024x1024",
			});
			setImage(response.data.data[0].url);
		}catch(e){
			setError(e?.message || "Something went wrong");
		} finally {
			setIsLoading(false);
		}
	};

	// TODO: This can be removed or changed according to project needs
	useLayoutEffect(() => {
		navigation.setOptions({
			headerTitle: translate(TRANSLATIONS.MAIN)
		});
	}, [navigation]);

	return (
		<View className="h-full w-full justify-center px-4">
			<Text className="text-2l py-4 text-center mt-8">Image Generated Open AI on React Native</Text>
			<View>

				<Image
					source={{ uri: image }}
					className="w-full h-64 rounded-lg shadow-lg mb-4 bg-slate-200"
				/>

			</View>
			
			<TextInput
				value={imagePrompt}
				onChangeText={setImagePrompt}
				className="w-full p-4 bg-white rounded-lg shadow-lg mb-4"
				placeholder="Enter a prompt"
				placeholderTextColor={"gray"}
			/>
			{error && <Text className="text-red-400 text-sm">{error}</Text>}
			<Button
				buttonColor="bg-blue-600"
				textColor="text-white"
				onPress={async () => {
					await generateImage(); 
				}}
				disabled={isLoading}
				isLoading={isLoading}
				label={translate(TRANSLATIONS.CHANGE_BUTTON)}
			/>
		</View>
	);
};

export default HomeScreen;