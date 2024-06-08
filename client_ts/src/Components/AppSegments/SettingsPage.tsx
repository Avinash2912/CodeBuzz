import Button from "../Common/Button";
import Input from "../Common/Input";

export default function SettingsPage()
{
    return(
        <div className="overflow-y-auto overflow-x-hidden h-full">
            <div className="card">
                <h1 className="text-3xl font-bold">Profile Settings</h1>
                <div className="flex flex-col my-8 gap-4">
                    <Input className="" type="file" label="Profile Picture"></Input>
                    <div className="flex flex-wrap gap-4">
                        <Input className="grow w-40" label="Username"></Input>
                        <Input className="grow w-40" label="Display Name"></Input>
                    </div>
                    <Input className="" label="Bio"></Input>
                </div>
                <Button className="w-full" big>SAVE CHANGES</Button>
            </div>
            <div className="card">
                <h1 className="text-3xl font-bold">Change Password</h1>
                <div className="flex flex-col my-8 gap-4">
                    <Input className="" type="password" label="Current Password"></Input>
                    <Input className="" type="password" label="New Password"></Input>
                    <Input className="" type="password" label="Confirm New Password"></Input>
                </div>
                <Button className="w-full" big>SAVE CHANGES</Button>
            </div>
        </div>
    )
}