// import React from "react";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Cards from "./components/Cards";
import Filter from "./components/Filter";
import {apiUrl, filterData} from "./data";
import Spinner from "./Spinner";
// import { Toast } from "react-toastify/dist/components";
import {toast} from "react-toastify"
const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);
  async function fetchData(){
    setLoading(true);
    try{
      let response =await fetch(apiUrl);
      let output = await response.json();
      setCourses(output.data);
    }
    catch(error){
      toast.error("Connection Failed!!! Retry later")
    }
    setLoading(false);
  }
  useEffect(() =>{
    fetchData();
  },[]);
  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>

      <div className="bg-bgDark2">
        <div>
          <Filter filterData = {filterData} category = {category}
          setCategory={setCategory}/>
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap">
          {            
              loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)            
          }
        </div>

      </div>


    </div>
  )
};

export default App;