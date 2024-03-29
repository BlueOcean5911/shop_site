import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Logo } from '@pmndrs/branding'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCamera, AiOutlineArrowLeft, AiOutlineHighlight, AiOutlineShopping } from 'react-icons/ai'
import { useSnapshot } from 'valtio'
import { state } from './store'
import MinusIconButton from './components/button/minus.icon'
import PlusIconButton from './components/button/plus.icon'
import ScrollButton from './components/button/scroll.button'
import ColorPicker from 'react-pick-color';


export function Overlay() {
  
  const snap = useSnapshot(state)
  const transition = { type: 'spring', duration: 0.8 }
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <motion.header initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
        <Logo width="40" height="40" />
        <motion.div animate={{ x: snap.intro ? 0 : 100, opacity: snap.intro ? 1 : 0 }} transition={transition}>
          <AiOutlineShopping size="3em" />
        </motion.div>
      </motion.header>
      <AnimatePresence>
        {snap.intro ? (
          <motion.section key="main" {...config}>
            <div className="section--container">
              <motion.div
                key="title"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: 'spring', damping: 5, stiffness: 40, restDelta: 0.001, duration: 0.3 }}>
                <h1>LET'S DO IT.</h1>
              </motion.div>
              <div className="support--content">
                <motion.div
                  key="p"
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    type: 'spring',
                    damping: 7,
                    stiffness: 30,
                    restDelta: 0.001,
                    duration: 0.6,
                    delay: 0.2,
                    delayChildren: 0.2
                  }}>
                  <p>
                    Create your unique and exclusive shirt with our brand-new 3D customization tool. <strong>Unleash your imagination</strong> and define your
                    own style.
                  </p>
                  <button className='text-white text-sm p-4 px-6' style={{ background: snap.color }} onClick={() => (state.intro = false)}>
                    CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.section key="custom" {...config}>
            <Customizer />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  )
}



function Customizer() {
  const snap = useSnapshot(state)
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const handleLogoPosition = (value) => {
    state.logo.position[0] += value[0];
    state.logo.position[1] += value[1];
    state.logo.position[2] += value[2];
    console.log(state.logo.position)
  }

  const handleTextPosition = (value) => {
    state.text.position[0] += value[0];
    state.text.position[1] += value[1];
    state.text.position[2] += value[2];
    console.log(state.text.position);
  }


  return (
    <div className="customizer">
      <div className="color-options">
        {snap.colors.map((color) => (
          <div key={color} className={`circle`} style={{ background: color }} onClick={() => (state.color = color)}></div>
        ))}
      </div>
      <div className='decals'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-4 p-2 border-2 border-gray-100 rounded-md shadow-lg'>
            <div className='flex flex-col'>
              <div className='text text-sm'>Text</div>
              <div className='flex gap-2 items-center'>
                <input
                  defaultValue={snap.text.content}
                  onChange={(e) => state.text.content = e.target.value}
                  id='text' className='outline-none border-2 border-gray-100 rounded-md text-sm p-1' />
                <div className='w-8 h-8  rounded-md text-sm border-4 hover:border-gray-500 hover:cursor-pointer' style={{ backgroundColor: snap.text.font.color }} onClick={() => openModal()}></div>
              </div>
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <span>Size</span>
                <div className='flex gap-2'>
                  <PlusIconButton style={{ backgroundColor: `${snap.color}` }} onClick={() => state.text.scale += 0.01} />
                  <MinusIconButton style={{ backgroundColor: `${snap.color}` }} onClick={() => state.text.scale -= 0.01} />
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                <span>Position</span>
                <div className='flex gap-2'>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[1, 0, 0]} action={handleTextPosition}>X</ScrollButton>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[0, 1, 0]} action={handleTextPosition}>Y</ScrollButton>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[0, 0, 1]} action={handleTextPosition}>Z</ScrollButton>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-4 p-2 border-2 border-gray-100 rounded-md shadow-lg'>
            <div className="decals--container p-2">
              {snap.decals.map((decal) => (
                <div key={decal} className={`decal`} onClick={() => (state.decal = decal)}>
                  <img src={decal + '_thumb.png'} alt="brand" />
                </div>
              ))}
            </div>
            <div className='flex gap-4'>
              <div className='flex flex-col gap-2'>
                <span>Size</span>
                <div className='flex gap-2'>
                  <PlusIconButton style={{ backgroundColor: `${snap.color}` }} onClick={() => state.logo.scale += 0.01} />
                  <MinusIconButton style={{ backgroundColor: `${snap.color}` }} onClick={() => state.logo.scale -= 0.01} />
                </div>
              </div>
              <div className='flex flex-col  gap-2'>
                <span>Position</span>
                <div className='flex gap-1'>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[1, 0, 0]} action={handleLogoPosition}>X</ScrollButton>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[0, 1, 0]} action={handleLogoPosition}>Y</ScrollButton>
                  <ScrollButton style={{ backgroundColor: `${snap.color}` }} type={[0, 0, 1]} action={handleLogoPosition}>Z</ScrollButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="share text-white text-sm p-4 px-6"
        style={{ background: snap.color }}
        onClick={() => {
          const link = document.createElement('a')
          link.setAttribute('download', 'canvas.png')
          link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
        }}>
        DOWNLOAD
        <AiFillCamera size="1.3em" />
      </button>
      <button className="exit text-white text-sm p-4 px-6" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-fit transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    Please choose your color
                  </Dialog.Title>
                  <div className='flex flex-col items-center my-8'>
                  <ColorPicker color={snap.text.font.color} onChange={color => state.text.font.color = color.hex ? color.hex : color} />
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex float-right justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Get back
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
