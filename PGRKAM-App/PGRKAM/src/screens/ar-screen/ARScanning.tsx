import {Alert, StyleSheet, View} from 'react-native';
import {WebView} from 'react-native-webview';
import React from 'react';

const ARScanning = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <WebView
        userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
        source={{
          uri: 'https://sdmrf.me/ArC/aframe/examples/new-location-based/ar/',
        }}
        onMessage={event => {
          if (event.nativeEvent.data == 'Infosys') {
            navigation.navigate('JobDescriptionScreen', {
              jobId: '3',
              jobTitle: 'Software Tester',
              qualification: 'Bachelors in Computer Science ',
              companyLogo:
                'https://static.vecteezy.com/system/resources/previews/020/336/451/original/infosys-logo-infosys-icon-free-free-vector.jpg',
              companyName: 'Infosys',
              specialization: 'Developer',
              jobType: 'Full Time',
              latitude: '12.971599',
              longitude: '77.594566',
              minSalary: '6',
              maxSalary: '7',
              requirements: [
                'Generate leads by identifying potential industrial areas/trading units and prepare strategies.',
                'Meet customer service requirements through regular interactions with the customers to understand business condition, etc',
                'Generate leads by identifying potential industrial areas/trading units and prepare strategies.',
                'Assist the Credit Manager in unit inspections and ensure timely insurance renewal, DP updated, stock',
              ],
              description:
                'We are looking for a Full Stack Developer to produce scalable software solutions. You’ll be part of a cross-functional team that’s responsible for the full software development life cycle, from conception to deployment. As a Full Stack Developer, you should be comfortable around both front-end and back-end coding languages, development frameworks and third-party libraries. You should also be a team player with a knack for visual design and utility',
              location: 'Mumbai, Maharashtra',
              experience: '2 Years',
              facilities: [
                'Medical',
                'Dental',
                'Meal Allowance',
                'Transport Allowance',
                'Monday to Friday',
              ],
            });
          } else {
            navigation.navigate('JobDescriptionScreen', {
              jobId: '658190864bc96dc06c1404b0',
              jobTitle: 'Credit Analyst',
              qualification: 'Bachelors in Commerce ',
              companyLogo:
                'https://static.toiimg.com/thumb/msid-74887573,imgsize-66932,width-400,resizemode-4/74887573.jpg',
              companyName: 'Punjab National Bank',
              specialization: 'Finance',
              jobType: 'Full Time',
              requirements: [
                'Generate leads by identifying potential industrial areas/trading units and prepare strategies.',
                'Meet customer service requirements through regular interactions with the customers to understand business condition, etc',
                'Generate leads by identifying potential industrial areas/trading units and prepare strategies.',
                'Assist the Credit Manager in unit inspections and ensure timely insurance renewal, DP updated, stock',
              ],
              description:
                'The Credit Analyst will be responsible for ensuring all critical deadlines are met, completing their responsibilities as it pertains to completing loan disclosures, processing all loans timely and meeting established Service Level Agreement (SLAs). This position will also be responsible for maintaining exceptional communication with both internal and external customers/borrowers, and for taking the initiative to investigate, research and resolve any issues that may arise. Additionally, this individual will work closely with Sales, Underwriting, Valuation and Closing departments to ensure that all loan conditions are submitted timely, loan quality expectations are met, and that files move to closing with as few touches as possible',
              minSalary: '6',
              maxSalary: '7',
              location: 'Pune, Maharashtra',
              experience: '2 Years',
              latitude: '12.971599',
              longitude: '77.594566',
              facilities: [
                'Medical',
                'Dental',
                'Meal Allowance',
                'Transport Allowance',
                'Monday to Friday',
              ],
            });
          }
        }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        scalesPageToFit={true}
        originWhitelist={['*']}
        mediaPlaybackRequiresUserAction={false} // Allow media playback without user gestures
        geolocationEnabled={true} // Enable geolocation services
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default ARScanning;
