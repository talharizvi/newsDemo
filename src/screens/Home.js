import React,{useState,useEffect} from 'react';
import {
    View,
    Text,FlatList,Image,TouchableOpacity,ActivityIndicator
  } from 'react-native';
import axios from 'axios';
import Card from '../custom/Card';
import TopCardSection from '../custom/TopCardSection';


const categoryData=[
    {
        name:'Health',
        image:require('../res/images/icons8-fire-100.png'),
        background:'#1bd2f2'
    },
    {
        name:'Business',
        image:require('../res/images/icons8-star-100.png'),
        background:'#f2a01b'
    },
    {
        name:'Sports',
        image:require('../res/images/icons8-sports-mode-100.png'),
        background:'#e88976'
    },
    {
        name:'Entertainment',
        image:require('../res/images/icons8-news-100.png'),
        background:'#664156'
    },
    {
        name:'Technology',
        image:require('../res/images/icons8-technology-lifestyle-100.png'),
        background:'#63eb82'
    }
]



const Home=({navigation})=>{

    const [latestData,setLatestData]=useState([])
    const [date,setDate]=useState('')
    useEffect(()=>{
        var d = new Date();
        var n = d.toString()
        var res = n.split(" ")
        console.log(res)
        const date = res[2]+" "+res[1]+" "+res[0] 
         setDate(date)
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=ac659059bcc34c4b9c74dfa215ff2eb7')
        .then(response=>{
            console.log(response.data.articles)
            setLatestData(response.data.articles)
        })
        .catch(error=>{
            console.log(error)
        })
    },[])
    
    const setTopImage=(item)=>{
        return(
            item.urlToImage!=null?
            <TopCardSection  backgroundColor='#000'>
            <Image source={{uri:item.urlToImage}} style={{width:200,height:200}}></Image>
            </TopCardSection>
            :
            <TopCardSection>
            <Image 
            style={{width:200,height:200}}
            source={require('../res/images/placeholder-image-icon.jpg')}></Image>
            </TopCardSection>
        )
    }

    const setNewsImage=(item)=>{
        return(
            item.urlToImage!=null?
            <Card nav={navigation} backgroundColor='#000'>
            <Image source={{uri:item.urlToImage}} style={{width:90,height:90}}></Image>
            </Card>
            :
            <Card nav={navigation} >
            <Image 
            style={{width:90,height:90}}
            source={require('../res/images/placeholder-image-icon.jpg')}></Image>
            </Card>
        )
    }

    //if(latestData.length>0){
        // return(
        
        // )
   // }
    // else{
    //     return(
   
    //     )
    // }
  

    return(
     latestData.length>0?   
     <View style={{flex:1}}>
     <Text style={{fontSize:15,fontWeight:'bold'}}>{date}</Text>
     
     
     <View style={{flex:1}}>
         <FlatList
             data={latestData.slice(0,5)}
             renderItem={({item})=>
             <TouchableOpacity onPress={()=>navigation.navigate('WebViewScreen',{url:item.url})}>
             <View style={{flexDirection:'column',width:200,column:200}}>
           {setTopImage(item)} 
                
                 <TopCardSection>
                 <Text style={{flex:1,fontSize:15,fontWeight:'bold',position:'absolute',bottom:50,borderRadius:4,backgroundColor:'#ccc',marginHorizontal:5,opacity:0.5}}>{item.title}</Text>
                 </TopCardSection>
             </View>
             </TouchableOpacity>
             }
             horizontal
             style={{marginBottom:5}}
         />
     </View>
     
     <Text style={{fontSize:20,marginLeft:5,marginBottom:5,fontWeight:'bold'}}>Top Categories</Text>
     <View>
     <FlatList 
     
         data={categoryData}
         renderItem={({item})=>
         <TouchableOpacity onPress={()=>navigation.navigate(item.name)}>
         <TopCardSection  backgroundColor={item.background} >
         <View style={{marginHorizontal:10}}>
           
             <Image
             style={{width: 60, height: 60}}
             source={item.image}>
             </Image>
             <Text style={{alignSelf:'center',fontWeight:'bold'}}>{item.name}</Text>
             
         </View>
         </TopCardSection>
         </TouchableOpacity>
         }

         horizontal

         style={{marginBottom:10}}
     />
     <Text style={{fontSize:20,marginLeft:5,marginBottom:5,marginTop:5,fontWeight:'bold'}}>Latest News</Text>
     </View>

     <View style={{flex:2.5}}>
     <FlatList
        
         data={latestData.slice(5,latestData.length)}
         renderItem={({item})=>
         <Card nav={navigation} webUrl={item.url}>
         <View style={{flexDirection:'row',marginVertical:5}}>
             {setNewsImage(item)}
             <Text style={{flex:1,fontSize:15,fontWeight:'bold'}}>{item.title}</Text>
         </View>
          </Card>
         }
     />
     </View>
 </View>
    :
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
    <ActivityIndicator size="large" color="#38302a" />
    </View>)

    
} 

export default Home