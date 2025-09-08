import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Eye, Download, Mail, Printer, Trash, MessageCircle } from 'react-feather';

function ActionDropdown() {
  return (
    <DropdownButton
      id="dropdown-basic-button"
      title="Actions"
      variant="primary"
      className=""
      align="end"
    >
      <Dropdown.Item onClick={() => alert('View Details')}>
        <Eye className="w-5 h-5 text-blue-500 mr-2" />
        View Details
      </Dropdown.Item>

      <Dropdown.Item onClick={() => alert('Download Invoice')}>
        <Download className="w-5 h-5 text-green-500 mr-2" />
        Download
      </Dropdown.Item>

      <Dropdown.Item onClick={() => alert('Send Invoice')}>
        <Mail className="w-5 h-5 text-red-500 mr-2" />
        Send Invoice
      </Dropdown.Item>

      <Dropdown.Item onClick={() => alert('Print Invoice')}>
        <Printer className="w-5 h-5 text-green-500 mr-2" />
        Print
      </Dropdown.Item>

      <Dropdown.Item onClick={() => alert('Delete Invoice')}>
        <Trash className="w-5 h-5 text-red-500 mr-2" />
        Delete
      </Dropdown.Item>

      <Dropdown.Item onClick={() => alert('Share on WhatsApp')}>
        <MessageCircle className="w-5 h-5 text-green-500 mr-2" />
        Share on WhatsApp
      </Dropdown.Item>
    </DropdownButton>
  );
}

export default ActionDropdown;