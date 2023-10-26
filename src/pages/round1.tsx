import React,{useState,type ChangeEvent} from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Round1() {
    const [de, setDe] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;

        let newDe = de;
        newDe = newDe.substr(0, index) + value + newDe.substr(index + 1);
        setDe(newDe);

        if (value && index < 15) {
        const nextInput = document.getElementById(
            `de-input-${index + 1}`
        ) as HTMLInputElement;
        nextInput.focus();
        }
    };

    return (
        <>
            <div className='flex flex-col mt-3 mx-3'>
                <h1 className='mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>Round 1</h1>
                
                <form >
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 1</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Hidden route" className='pl-2'/>
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 2</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Login route" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 3</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Ceaser cipher key" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 4</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Playfair cipher key" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 5</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Admin password" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Did you solve the captcha?</h2>
                        <div className="flex flex-row w-full max-w-sm justify-center space-x-2">  
                            <div className="flex items-center">
                                <input id="radio1" type="radio" value="true" name="captcharadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="radio1" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yes</label>
                            </div>
                            <div className="flex items-center">
                                <input defaultChecked id="radio2" type="radio" value="false" name="captcharadio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="radio2" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">No</label>
                            </div>
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 6</h2>
                        <div className="flex flex-row w-full items-center space-x-2">
                            <Input type="text" placeholder="Hacker name" className=' pl-2'/>
                            <Input type="text" placeholder="Hacker location" className=' pl-2'/>
                            <Input type="text" placeholder="Hacker pin" className=' pl-2'/>
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>DE</h2>
                        <div className="flex flex-row w-full justify-center items-center space-x-2">
                            {Array.from({ length: 16 }, (_, index) => (
                                <input
                                id={`de-input-${index}`}
                                key={index}
                                className="w-8 h-8 text-xl border border-gray-300 text-center mx-2"
                                type="text"
                                maxLength={1}
                                value={de[index] ?? ""}
                                onChange={(e) => handleChange(e, index)}
                                />
                            ))}
                        </div>   
                    </div>
                    <div className='flex justify-center mt-2'>
                        <Button type="submit" className='bg-[#10b981] text-white'>Submit</Button>
                    </div>
                </form>
            </div>
        </>
    );
}
