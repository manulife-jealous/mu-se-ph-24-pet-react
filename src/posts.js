import Update from './components/Update';
import Delete from './components/Delete';

function Posts() {
    return (
        <>
        <div style={{padding: "10px"}}>
            <Update />
        </div>
        <div style={{padding: "10px"}}>            
            <Delete />
        </div>
        </>
    )
}

export default Posts; 