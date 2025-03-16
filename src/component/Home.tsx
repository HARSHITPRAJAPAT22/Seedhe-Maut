import { Link } from 'react-router-dom'
import { Button } from './Button'
import { Card } from './Card'
import { Navbar } from './Navbar'
import '../App.css'
export function Home(){
    return (
        <div className="min-h-screen relative">
        {/* Background Layer */}
        <div className="fixed top-0 -z-10 min-h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_20%,rgba(200,50,50,0.5),rgba(255,255,255,0))]"></div>
      
        {/* Navbar Section */}
        <div className="relative z-10">
          <Navbar />
        </div>
        <div className="flex justify-center items-center min-h-screen">
        <Card />
        </div>
        <div className='flex justify-center items-center'>
          <Link to={'../player'} >
          <Button/>
          </Link>
        </div>
      </div>
    )
}