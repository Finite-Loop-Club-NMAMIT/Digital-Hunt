import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Round2() {

    return (
        <>
            <div className='flex flex-col mt-3 mx-3'>
                <h1 className='mb-4 text-2xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white'>Round 2</h1>   
                <form >
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 1</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="First word" className='pl-2'/>
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 2</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Second word" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 3</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Third word" className=' pl-2'/>
                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 4</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Intermediate passcode" className=' pl-2'/>
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 5</h2>
                        <div className="flex flex-row w-full items-center space-x-2">
                            <Input type="text" placeholder="Latitude" className=' pl-2'/>
                            <Input type="text" placeholder="Longitude" className=' pl-2' />                            
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 6</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Passcode" className=' pl-2' />
                        </div>   
                    </div>
                    <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className='flex flex-col gap-2 items-center'>
                        <h2 className='text-center'>Puzzle 7</h2>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Badge" className=' pl-2'/>
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
