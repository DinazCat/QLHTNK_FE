import axios from "axios";

const client = axios.create({
    baseURL:'http://localhost:3001/api'
})

const getAllServices = async() => {
    try{
        const response = await client.get('/ServiceManagement/getServices')
        if(response.data.success){
            return response.data.services;           
        }
        else{
            console.log("not get services")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addService = async (data) => {
    const endpoint = "/ServiceManagement/add";
    try{
      const response = await client.post(endpoint, data);
      return response.data.docId;    
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const deleteService = async (id)=>{
    try{
        await client.delete('/ServiceManagement/delete/' + id);        
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateService = async(data, id) => {
    const endpoint = '/ServiceManagement/update/' + id;
    try {
        const response = await client.put(endpoint, data);
    } catch (error) {
        console.error('error: ', error.message);
    }
}
const getServicesBySeacrh = async (searchCriteria) => {
    try {
      const queryParams = new URLSearchParams(searchCriteria).toString();
      const response = await client.get(`/ServiceManagement/Services?${queryParams}`);
  
      if (response.data.success) {
        return response.data.services;
      } else {
        console.log("not get services");
      }
    } catch (error) {
      console.log('error: ', error.message);
      return [];
    }
};

const getAllMaterials = async() => {
    try{
        const response = await client.get('/IventoryManagement/Material/getMaterials')
        if(response.data.success){
            return response.data.materials;           
        }
        else{
            console.log("not get materials")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addMaterial = async (data) => {
    const endpoint = "/IventoryManagement/Material/add";
    try{
      const response = await client.post(endpoint, data)  
      return response.data.docId;  
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const deleteMaterial = async (id)=>{
    try{
        await client.delete('/IventoryManagement/Material/delete/' + id);        
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateMaterial = async(data, id) => {
    const endpoint = '/IventoryManagement/Material/update/' + id;
    console.log(id)
    try {
        const response = await client.put(endpoint, data);
    } catch (error) {
        console.error('error: ', error.message);
    }
}
const getMaterialsBySeacrh = async (searchCriteria) => {
    try {
      const queryParams = new URLSearchParams(searchCriteria).toString();
      const response = await client.get(`/IventoryManagement/Material/Materials?${queryParams}`);
  
      if (response.data.success) {
        return response.data.materials;
      } else {
        console.log("not get materials");
      }
    } catch (error) {
      console.log('error: ', error.message);
      return [];
    }
};

const getAllDrugs = async() => {
    try{
        const response = await client.get('/IventoryManagement/Drug/getDrugs')
        if(response.data.success){
            return response.data.drugs;           
        }
        else{
            console.log("not get drugs")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addDrug = async (data) => {
    const endpoint = "/IventoryManagement/Drug/add";
    try{
      const response = await client.post(endpoint, data);
      return response.data.docId;    
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const deleteDrug = async (id)=>{
    try{
        await client.delete('/IventoryManagement/Drug/delete/' + id);        
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateDrug = async(data, id) => {
    const endpoint = '/IventoryManagement/Drug/update/' + id;
    try {
        const response = await client.put(endpoint, data);
    } catch (error) {
        console.error('error: ', error.message);
    }
}
const getDrugsBySeacrh = async (searchCriteria) => {
    try {
      const queryParams = new URLSearchParams(searchCriteria).toString();
      const response = await client.get(`/IventoryManagement/Drug/Drugs?${queryParams}`);
  
      if (response.data.success) {
        return response.data.drugs;
      } else {
        console.log("not get drugs");
      }
    } catch (error) {
      console.log('error: ', error.message);
      return [];
    }
};

const getAllBranchs = async() => {
    try{
        const response = await client.get('/BranchManagement/getBranchs')
        if(response.data.success){
            return response.data.branchs;           
        }
        else{
            console.log("not get branchs")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addBranch = async (data) => {
    const endpoint = "/BranchManagement/add";
    try{
      const response = await client.post(endpoint, data);
      return response.data.docId;    
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const deleteBranch = async (id)=>{
    try{
        await client.delete('/BranchManagement/delete/' + id);        
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateBranch = async(data, id) => {
    const endpoint = '/BranchManagement/update/' + id;
    try {
        const response = await client.put(endpoint, data);
    } catch (error) {
        console.error('error: ', error.message);
    }
}
const getBranchsBySeacrh = async (searchCriteria) => {
    try {
      const queryParams = new URLSearchParams(searchCriteria).toString();
      const response = await client.get(`/BranchManagement/Branchs?${queryParams}`);
  
      if (response.data.success) {
        return response.data.branchs;
      } else {
        console.log("not get branchs");
      }
    } catch (error) {
      console.log('error: ', error.message);
      return [];
    }
};

const getAllFeedbacks = async(sortOrder) => {
    try{
        const queryParams = new URLSearchParams({sortOrder: sortOrder}).toString();
        const response = await client.get(`/FeedbackManagement/getFeedbacks?${queryParams}`);
        if(response.data.success){
            return response.data.feedbacks;           
        }
        else{
            console.log("not get drugs")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addFeedback = async (data) => {
    const endpoint = "/FeedbackManagement/add";
    try{
      const response = await client.post(endpoint, data);
      return response.data.docId;    
    }
    catch(error){
      console.log('error: ', error.message)
    }
}

const getAllStaffs = async() => {
    try{
        const response = await client.get('/StaffManagement/getStaffs')
        if(response.data.success){
            return response.data.staffs;           
        }
        else{
            console.log("not get staffs")
        }        
    }
    catch(error){
        console.log('error: ', error.message)
        return [];
    }
}
const addStaff = async (data) => {
    const endpoint = "/StaffManagement/add";
    try{
      const response = await client.post(endpoint, data);
      return response.data.docId;    
    }
    catch(error){
      console.log('error: ', error.message)
    }
}
const deleteStaff = async (id)=>{
    try{
        await client.delete('/StaffManagement/delete/' + id);        
    }
    catch(error){
        console.log('error: ', error.message)
    }
}
const updateStaff = async(data, id) => {
    const endpoint = '/StaffManagement/update/' + id;
    console.log(id);
    console.log(data)
    try {
        const response = await client.put(endpoint, data);
    } catch (error) {
        console.error('error: ', error.message);
    }
}
const getStaffsBySeacrh = async (searchCriteria) => {
    try {
      const queryParams = new URLSearchParams(searchCriteria).toString();
      const response = await client.get(`/StaffManagement/Staffs?${queryParams}`);
  
      if (response.data.success) {
        return response.data.staffs;
      } else {
        console.log("not get staffs");
      }
    } catch (error) {
      console.log('error: ', error.message);
      return [];
    }
};

export default {
    getAllServices, addService, updateService, deleteService, getServicesBySeacrh,
    getAllMaterials, addMaterial, updateMaterial, deleteMaterial, getMaterialsBySeacrh,
    getAllDrugs, addDrug, updateDrug, deleteDrug, getDrugsBySeacrh,
    getAllBranchs, addBranch, updateBranch, deleteBranch, getBranchsBySeacrh,
    getAllFeedbacks, addFeedback,
    getAllStaffs, addStaff, updateStaff, deleteStaff, getStaffsBySeacrh,
}