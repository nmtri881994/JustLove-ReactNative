/**
 * Created by Tri on 8/21/2017.
 */
//import constants
import * as CST from '../constants/index'
import * as API from '../api/MemoryAndReminderAPI'
import AsyncStorageAccess from '../api/AsyncStorageAccess';
import {dispatch} from '../stores'

export const getLast5Memories = (token) => {
    API.getLast5Memories(token)
        .then(res=>{
            dispatch({
                type: CST.GET_LAST_5_MEMORIES,
                memories: res.memories
            })
        })
        .catch(error=>{
            console.log(error);
        })
};

export const addMemory = (token, memory) => {
    console.log(123);
    API.addMemory(token, memory)
        .then(res=>{
            dispatch({
                type: CST.ADD_MEMORY,
                memories: res.memories
            })
        })
        .catch(error=>{
            console.log(error);
        })
};
