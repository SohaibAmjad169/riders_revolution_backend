import { notificationSchema } from '../../Model/NotificationModal.js'
import { Wishlist } from '../../Model/WishListModel.js';
export const Notification = async (req, res) => {
    const { bikeId, message } = req.body;

    try {
        const wishlistData = await Wishlist.find({ bike: bikeId });

        if (wishlistData.length === 0) {
            return res.status(404).json({ success: false, message: 'No users have this bike in their wishlist.' });
        }

        for (const wishlist of wishlistData) {
            const { _id, userName, userEmail } = wishlist;

            await notificationSchema.create({
                userId: _id,
                userName,
                userEmail,
                bikeId,
                message,
                createdAt: new Date(),
                status: 'unread',
            });
        }

        res.status(200).json({ success: true, message: 'Notifications sent successfully!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send notifications.' });
    }
};

export const NotificationFetch = async (req, res) => {
    const { userEmail } = req.query;
    try {
        if (!userEmail) {
            return res.status(400).json({ success: false, message: "userEmail is required." });
        }

        const notifications = await notificationSchema.find({ userEmail: userEmail });
        if (notifications.length === 0) {
            return res.status(404).json({ success: false, message: 'No notifications found.' });
        }

        res.status(200).json({
            success: true,
            message: 'Notification Data Fetched!',
            notifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({
            success: false,
            message: 'Failed to Fetch notifications.',
        });
    }
};

export const updateNotificationStatus = async (req, res) => {
    const { _id } = req.query;
   console.log(_id);
   
    try {
        const updatedNotification = await notificationSchema.findByIdAndUpdate(
            _id,
            { status: 'read' },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({ success: false, message: 'Notification not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Notification status updated to read',
            updatedNotification,
        });
    } catch (error) {
        console.error('Error updating notification:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update notification status',
        });
    }
};