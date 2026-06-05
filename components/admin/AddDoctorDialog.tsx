"use client"
import React,{useState} from 'react'
import {Gender} from "@/src/generated/prisma/enums";
import {useCreateDoctor} from "@/hooks/use-doctors";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Button} from "@/components/ui/button";
import {formatPhoneNumber} from "@/lib/utils";

interface AddDoctorProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddDoctorDialog = ({isOpen, onClose}:AddDoctorProps) => {

    const [newDoctor, setNewDoctor] = useState({
        name:"",
        email:"",
        phone:"",
        speciality:"",
        gender:"MALE" as Gender,
        isActive:true,
    });

    const createDoctorMutation = useCreateDoctor()

    const handlePhoneChange = (value:string) =>  {
        const formattedNumber = formatPhoneNumber(value)
        setNewDoctor(({...newDoctor, phone: formattedNumber}))
    }

    const handleClose = () =>{
        onClose();
        setNewDoctor(({
            name:"",
            email:"",
            phone:"",
            speciality:"",
            gender:"MALE" as Gender,
            isActive:true,
        }))
    }

    const handleSave = () => {
        createDoctorMutation.mutate({...newDoctor},{ onSuccess:handleClose})

    }
    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px]">

            <DialogHeader>
                <DialogTitle>Add New Doctor</DialogTitle>
            <DialogDescription >Add a new doctor to your practice.</DialogDescription>
            </DialogHeader>
                <div className={"grid gap-4 py-4"}>
                    <div className="grid grid-cols-2 gap-4">


                        <div className="space-y-2">
                            <Label htmlFor="new-name">Name</Label>
                            <Input
                                id={"new-name"}
                                value={newDoctor.name}
                                onChange={(e) => setNewDoctor({...newDoctor, name: e.target.value})}
                                placeholder={"Dr John Smith"}

                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new-speciality">Speciality</Label>
                            <Input
                                id={"new-name"}
                                value={newDoctor.speciality}
                                onChange={(e) => setNewDoctor({...newDoctor, speciality: e.target.value})}
                                placeholder={"General Dentistry"}

                            />
                        </div>
                    </div>
                        <div className="space-y-2">
                            <Label htmlFor="new-name">Email</Label>
                            <Input
                                id={"email"}
                                type="email"
                                value={newDoctor.email}
                                onChange={(e) => setNewDoctor({...newDoctor, email: e.target.value})}
                                placeholder={"doctor@email.com"}

                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new-phone">Phone</Label>
                            <Input
                                id={"new-phone"}
                                value={newDoctor.phone}
                                onChange={(e ) =>handlePhoneChange(e.target.value)}
                                placeholder={"(555)-555-555"}

                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                            <Label htmlFor="new-gender">Gender</Label>
                            <Select
                            value={newDoctor.gender || ""}
                            onValueChange={(value) => setNewDoctor({...newDoctor,gender:value as Gender})}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="MALE">Male</SelectItem>
                                        <SelectItem value="FEMALE">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new-active">Status</Label>
                                <Select
                                    value={newDoctor.isActive ? "active":"inactive"}
                                    onValueChange={(value) => setNewDoctor({...newDoctor,isActive:value === "active"})}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>

                <DialogFooter>
                    <Button variant = "outline"
                    onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogFooter>

                <DialogFooter>
                    <Button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primary/90"
                        disabled={!newDoctor.name || !newDoctor.speciality || !newDoctor.email || createDoctorMutation.isPending}
                    >
                        {createDoctorMutation.isPending ? "Adding doctor..." : "Add doctor"}
                    </Button>
                </DialogFooter>

            </DialogContent>
        </Dialog>
    )
}
export default AddDoctorDialog
