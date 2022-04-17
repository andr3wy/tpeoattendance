import React, { useEffect, useState } from 'react';
import {Link, Redirect} from 'react-router-dom';
import { useForm } from "react-hook-form";
import Success from './LandingPage';

export default function SignIn() {
    const [name, setName] = useState('');
    const [errorMessage, setErrorMessage] = useState(0);
    const [meeting, setMeeting] = useState('');

    async function handleLogin(data) {
        console.log(data);
        if(data.type && data.name) {
            const request = await fetch("http://localhost:4000/checkin", {
                method: "POST",
                mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
            const result = await request.json();
            const status = await request.status;
            console.log(result);
            if(status === 200) {
                if(result.msg === "invalid time") {
                    setErrorMessage(1);
                    console.log("invalid time")
                } else if(result.msg === "name is not valid") {
                    setErrorMessage(2);
                    console.log("invalid name")
                } else {

                    setErrorMessage(-1);
                    console.log("valid!!");
                    console.log(errorMessage)
                    window.location.href = `/success`;


                }
            } else {
                setErrorMessage(3);
            }

        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => handleLogin(data);
    console.log(errors);

    function RenderPage(props) {
        const valid = props.error;
        if(valid === -1) {
            return (
                <Success/>
            );
        } else {
            return (
                <section className="hero is-primary is-fullheight">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-centered">
                                <div className="column is-7-tablet is-6-desktop is-5-widescreen">
                                    <form onSubmit={handleSubmit(onSubmit)} className="box">
                                        <div className="field">
                                            <label htmlFor="" className="label">Name</label>
                                            <input type="text" className= "input" placeholder="name" {...register("name", { required: true })} />
                                            {errors.name && errors.name.type === "required" && (
                                                <span role="alert">Name is required</span>
                                            )}
                                        </div>
                                        <div className="control">
                                            <label className={"label"}>Meeting Type</label>
                                            <select className={"dropdown-content"} {...register("type", { required: true })}>
                                                <option value="General">General</option>
                                                <option value="Engineering"> Engineering</option>
                                                <option value="Design"> Design</option>
                                                <option value="Product"> Product</option>
                                            </select>
                                        </div>
                                        <label className={"label"}> </label>
                                        <div className="field">
                                            <input className="button is-success" type="submit" />
                                        </div>
                                        {errorMessage === 1 && <p>Invalid time to check in</p>}
                                        {errorMessage === 2 && <p>Invalid name to check in</p>}
                                        {errorMessage === 3 && <p>Server Issues</p>}
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </section>
            );
        }
    }
    return (
        // <section className="hero is-primary is-fullheight">
        //     <div className="hero-body">
        //         <div className="container">
        //             <div className="columns is-centered">
        //                 <div className="column is-7-tablet is-6-desktop is-5-widescreen">
        //                     <form onSubmit={handleSubmit(onSubmit)} className="box">
        //                         <div className="field">
        //                             <label htmlFor="" className="label">Name</label>
        //                             <input type="text" className= "input" placeholder="name" {...register("name", { required: true })} />
        //                             {errors.name && errors.name.type === "required" && (
        //                                 <span role="alert">Name is required</span>
        //                             )}
        //                             {/*<input type="text"  className="input"*/}
        //                             {/*           required onChange={({target}) => setName(target.value)}/>*/}
        //                         </div>
        //                         <div className="control">
        //                             <label className={"label"}>Meeting Type</label>
        //                             <select className={"dropdown-content"} {...register("type", { required: true })}>
        //                                 <option value="General">General</option>
        //                                 <option value="Engineering"> Engineering</option>
        //                                 <option value="Design"> Design</option>
        //                                 <option value="Product"> Product</option>
        //                             </select>
        //                         </div>
        //                         <label className={"label"}> </label>
        //                         <div className="field">
        //                             <input className="button is-success" type="submit" />
        //                         </div>
        //                         {errorMessage === 1 && <p>Invalid time to check in</p>}
        //                         {errorMessage === 2 && <p>Invalid name to check in</p>}
        //                         {errorMessage === 3 && <p>Server Issues</p>}
        //                     </form>
        //
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        <RenderPage error={errorMessage}/>
    );
}

const Footer = () => {
    return (
        <div>
            {/*<p className="text-center" style={ FooterStyle }>Designed & coded by Andrew Yao</p>*/}
            <Link to={"/admin"}><label className={"right-label"} style={FooterStyle}>Admin? Click me!</label></Link>
        </div>

    );
}



const FooterStyle = {
    background: "#222",
    fontSize: ".8rem",
    color: "#fff",
    position: "absolute",
    bottom: 0,
    padding: "1rem",
    margin: 0,
    width: "100%",
    opacity: ".5"
}


//
// import React from 'react';
// import { useForm } from 'react-hook-form';
//
// export default function App() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log(errors);
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" placeholder="name" {...register("name", {})} />
//             <select {...register("type", { required: true })}>
//                 <option value="General">General</option>
//                 <option value=" Engineering"> Engineering</option>
//                 <option value=" Design"> Design</option>
//                 <option value=" Product"> Product</option>
//             </select>
//
//             <input type="submit" />
//         </form>
//     );
// }
//
//
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useForm } from "react-hook-form";
//
// export default function SignIn() {
//     const [name, setName] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [meeting, setMeeting] = useState('');
//
//     useEffect(() => {
//
//     });
//     const handleLogin = (event) => {
//         event.preventDefault();
//         console.log('logging in with', name, meeting);
//     }
//     function handleOptionChange(e) {
//
//     }
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log(errors);
//
//     return (
//         <section className="hero is-primary is-fullheight">
//             <div className="hero-body">
//                 <div className="container">
//                     <div className="columns is-centered">
//                         <div className="column is-5-tablet is-4-desktop is-3-widescreen">
//                             <form onSubmit={handleSubmit(onSubmit)} className="box">
//                                 <div className="field">
//                                     <label htmlFor="" className="label">Name</label>
//                                     <input type="text" className= "input" placeholder="name" {...register("name", { required: true })} />
//                                     {errors.name && errors.name.type === "required" && (
//                                         <span role="alert">Name is required</span>
//                                     )}
//                                     {/*<input type="text"  className="input"*/}
//                                     {/*           required onChange={({target}) => setName(target.value)}/>*/}
//                                 </div>
//                                 <div className="control">
//                                     {/*<label className="radio">*/}
//                                     {/*    <input type="radio" name="answer" required />*/}
//                                     {/*         GM*/}
//                                     {/*</label>*/}
//                                     {/*<label className="radio">*/}
//                                     {/*    <input type="radio" name="answer"/>*/}
//                                     {/*         PM*/}
//                                     {/*</label>*/}
//                                     {/*<label className="radio">*/}
//                                     {/*    <input type="radio" name="answer" />*/}
//                                     {/*     DM*/}
//                                     {/*</label>*/}
//                                     {/*<label className="radio">*/}
//                                     {/*    <input type="radio" name="answer" />*/}
//                                     {/*     EM*/}
//                                     {/*</label>*/}
//
//                                     <select className={"dropdown-content"} {...register("type", { required: true })}>
//                                         <option value="General">General</option>
//                                         <option value="Engineering"> Engineering</option>
//                                         <option value="Design"> Design</option>
//                                         <option value="Product"> Product</option>
//                                     </select>
//
//
//                                 </div>
//                                 <div className="field">
//                                     {/*<button className="button is-success">*/}
//                                     {/*    Login*/}
//                                     {/*</button>*/}
//                                     <input className="button is-success" type="submit" />
//                                 </div>
//                             </form>
//
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


//
// import React from 'react';
// import { useForm } from 'react-hook-form';
//
// export default function App() {
//     const { register, handleSubmit, formState: { errors } } = useForm();
//     const onSubmit = data => console.log(data);
//     console.log(errors);
//
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" placeholder="name" {...register("name", {})} />
//             <select {...register("type", { required: true })}>
//                 <option value="General">General</option>
//                 <option value=" Engineering"> Engineering</option>
//                 <option value=" Design"> Design</option>
//                 <option value=" Product"> Product</option>
//             </select>
//
//             <input type="submit" />
//         </form>
//     );
// }
