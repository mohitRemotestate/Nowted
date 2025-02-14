import axios from "axios";
import React,{useEffect, useState} from "react";
import Recent from "../Left/Recent";

const url = "/notes/recent";










const recent = axios.get(url)
const [notes, setNotes] = useState({ });

function Data() {


 return (
     <>
        
     </>
 );
}

export default Data;
  