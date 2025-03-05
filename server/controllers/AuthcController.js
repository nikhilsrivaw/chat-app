export const signup = async(request, response, next)=>{
    try{
        const {email, password, firstName, lastName} = request.body;
        if(!email || !password ){
            return response.status(400).json({error: "All fields are required"});
        }
        const user = await User
         

    } catch(error){
        console.log(error);
        return response.status(500).json({error: "Something went wrong"});
    }
}