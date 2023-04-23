import { Fragment, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Radio,
} from "@material-tailwind/react";

import { PlusIcon } from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";


export default function PlaylistDialogBox({ title, message, openDialog, handleOkayButton, handleCancelButton, ConfirmText, CancelText }) {
  const [open, setOpen] = useState(true);
  const [currplayistId, setPLaylistId] = useState("")
  const [newPlaylist, setNewPlaylist] = useState('')
  const user = useSelector((state) => state.UserSlice);


  const [playlists, setplaylists] = useState([
    { _id: '1', name: 'Education podcasts' },
    { _id: '2', name: 'Timepass' },
    { _id: '3', name: 'Anime' },
    { _id: '4', name: 'Gaming mood' },
  ])

  const handlePlaylistChange = (e) => {
    setNewPlaylist(e.target.value)
  }

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog])


  const handleCancel = () => {
    setOpen(false)
    handleCancelButton(false)
  }

  const addToPlaylist = () => {
    console.log(user);
    console.log(newPlaylist);
  }

  return (
    <Fragment>
      <Dialog open={open} handler={handleOkayButton}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody divider>
          <div className="flex mb-2">
            <Input className="border-none outline-none" variant="static" placeholder="Create New playlist" onChange={handlePlaylistChange}/>
          </div>
          <div className="flex flex-col">
            {
              playlists.map((item, index) => (
                <div className="flex items-center mb-2" key={index} >
                  <input
                    className="mr-2 leading-tight"
                    type="radio"
                    name="type"
                    value={item._id}
                    onChange={(e) => setPLaylistId(e.target.value)}
                  />
                  <span className="text-sm text-gray-700">{item.name}</span>
                </div>
              ))
            }
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleCancel}
            className="mr-1"
          >
            <span>{!CancelText ? "Cancel" : CancelText}</span>
          </Button>
          <Button variant="gradient" color="green" onClick={addToPlaylist}>
            <span>{!ConfirmText ? "Confirm" : ConfirmText}</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}