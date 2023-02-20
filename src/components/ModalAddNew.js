import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {postCreateUser} from '../services/UserService';
import { toast } from 'react-toastify';

const ModalAddNew = (props) => {
    const { show, handleClose, handleUpdateTable} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
     
    const handleSaveUser = async () =>{
        let res = await postCreateUser(name,job);
        if(res && res.id) {
            // thêm thành công
            handleClose();
            setName('');
            setJob('');
            toast.success("A User is created succeed!");
            handleUpdateTable({first_name:name, id:res.id})
        } else{
            // lỗi
            toast.error("An erorr...");
        }
    }
     return (
        <>
          <Modal show={show} onHide={handleClose}
               backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input type="email" className="form-control" 
                            value={name} 
                            onChange={(event) => setName(event.target.value)}/>
                        </div>
                        <div className="mb-3">
                            <label  className="form-label">Job</label>
                            <input type="text" className="form-control"
                           value={job} 
                           onChange={(event) => setJob(event.target.value)}
                        />
                    </div>
                
                    </div>
                </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=> handleSaveUser()}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalAddNew;