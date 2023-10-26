import React from 'react';


interface Props {
    
}

const Round1: NextPage<Props> = ({  }) => {

    return (
        <>
            <div className='flex flex-col mt-6'> 
                <div className='flex flex-col gap-2'>
                    <h2 className='text-center'>Find the hidden link</h2>
                    {/* <div className='flex flex-row justify-center gap-4'> */}
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="email" placeholder="Email" />
                            <Button type="submit">Subscribe</Button>
                        </div>   
                    {/* </div> */}
                </div>
            </div>
        </>
    );
};

export default Round1;
