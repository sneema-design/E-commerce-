import * as Yup from "yup"


export const CategorySchemaValidaion=Yup.object({
    name:Yup.string().required("name is required"),
    image:Yup.string().required("imavgae")
    
})